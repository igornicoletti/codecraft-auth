import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getBreadcrumb, useBreadcrumb, type BreadcrumbItem as IBreadcrumbItem } from '@/components/breadcrumb'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MAX_VISIBLE_ITEMS = 3

export const BreadcrumbCollapsed = () => {
  const items = useBreadcrumb()
  const state = getBreadcrumb(items, MAX_VISIBLE_ITEMS)

  if (items.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {state.type === 'full' ? (
          state.items.map((item, index) => (
            <Fragment key={item.href}>
              <BreadcrumbNode item={item} />
              {index < state.items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))
        ) : (
          <>
            <BreadcrumbNode item={state.first} />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {state.middle.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbNode item={state.last} />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const BreadcrumbNode = ({ item }: { item: IBreadcrumbItem }) => (
  <BreadcrumbItem>
    {item.isCurrent ? (
      <BreadcrumbPage>{item.label}</BreadcrumbPage>
    ) : (
      <BreadcrumbLink asChild>
        <Link to={item.href}>{item.label}</Link>
      </BreadcrumbLink>
    )}
  </BreadcrumbItem>
)
