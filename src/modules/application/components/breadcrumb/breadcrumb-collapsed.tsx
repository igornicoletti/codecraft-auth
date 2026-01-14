import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/use-media-query'
import type { BreadcrumbData } from '@/modules/application/types/app.types'

const ITEMS_TO_SHOW = 3

export const BreadcrumbCollapsed = ({ breadcrumb }: { breadcrumb: BreadcrumbData[] }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)

  if (!breadcrumb?.length) return null

  const shouldCollapse = breadcrumb.length > ITEMS_TO_SHOW

  if (!shouldCollapse) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1
            return (
              <Fragment key={item.url}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const firstItem = breadcrumb[0]
  const hiddenItems = breadcrumb.slice(1, -2)
  const visibleTail = breadcrumb.slice(-2)

  const CollapsedTriggerIcon = <BreadcrumbEllipsis />

  const renderCollapsedMenu = () => {
    if (isDesktop) {
      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className='flex items-center outline-none hover:text-foreground'>
            {CollapsedTriggerIcon}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {hiddenItems.map((item) => (
              <DropdownMenuItem key={item.url} asChild>
                <Link to={item.url}>{item.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className='flex items-center outline-none hover:text-foreground'>
          {CollapsedTriggerIcon}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Navegar para</DrawerTitle>
          </DrawerHeader>
          <div className='grid gap-1 px-4 pb-4'>
            {hiddenItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => setOpen(false)}
                className='block py-2 text-sm font-medium hover:underline'>
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
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={firstItem.url}>{firstItem.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          {renderCollapsedMenu()}
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {visibleTail.map((item, index) => {
          const isLast = index === visibleTail.length - 1
          return (
            <Fragment key={item.url}>
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
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
