import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/use-media-query'

interface IBreadcrumbData {
  title: string
  url: string
}

export const BreadcrumbCollapsed = ({ breadcrumb }: { breadcrumb: IBreadcrumbData[] }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)

  if (!breadcrumb || breadcrumb.length === 0) return null

  const first = breadcrumb[0]
  const visibleTail = breadcrumb.slice(-2)
  const hiddenItems = breadcrumb.length > 3 ? breadcrumb.slice(1, -2) : []
  const showCollapsed = hiddenItems.length > 0

  const CollapsedMenu = (
    <BreadcrumbItem>
      {isDesktop ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className='flex items-center outline-none'>
            <BreadcrumbEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {hiddenItems.map((item) => (
              <DropdownMenuItem key={item.url} asChild>
                <Link to={item.url}>{item.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className='flex items-center outline-none'>
            <BreadcrumbEllipsis />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Ir para</DrawerTitle>
            </DrawerHeader>
            <div className='grid gap-1 px-4 pb-4'>
              {hiddenItems.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setOpen(false)}
                  className='py-2 text-sm'>
                  {item.title}
                </Link>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </BreadcrumbItem>
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={first.url}>{first.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumb.length > 1 && <BreadcrumbSeparator />}

        {showCollapsed && (
          <React.Fragment>
            {CollapsedMenu}
            <BreadcrumbSeparator />
          </React.Fragment>
        )}

        {visibleTail.map((item, index) => {
          const isLast = index === visibleTail.length - 1
          if (breadcrumb.length <= 2 && index === 0) return null

          return (
            <React.Fragment key={item.url}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className='max-w-20 truncate md:max-w-none'>
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className='max-w-20 truncate md:max-w-none'>
                    <Link to={item.url}>{item.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
