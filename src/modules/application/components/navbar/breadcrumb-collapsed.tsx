import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { BreadcrumbData } from '@/modules/application/types/app.types'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ITEMS_TO_SHOW = 2

const BreadcrumbLinkItem = ({ item, isLast }: { item: BreadcrumbData; isLast: boolean }) => (
  <BreadcrumbItem>
    {isLast ? (
      <BreadcrumbPage className="max-w-20 truncate sm:max-w-none">
        {item.title}
      </BreadcrumbPage>
    ) : (
      <BreadcrumbLink asChild className="max-w-20 truncate sm:max-w-none">
        <Link to={item.url}>{item.title}</Link>
      </BreadcrumbLink>
    )}
  </BreadcrumbItem>
)

export const BreadcrumbCollapsed = ({ breadcrumb }: { breadcrumb: BreadcrumbData[] }) => {
  if (!breadcrumb?.length) return null

  const firstItem = breadcrumb[0]
  const hiddenItems = breadcrumb.slice(1, -1)
  const lastItem = breadcrumb[breadcrumb.length - 1]
  const shouldCollapse = breadcrumb.length > ITEMS_TO_SHOW

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!shouldCollapse ? (
          breadcrumb.map((item, index) => (
            <Fragment key={item.url}>
              <BreadcrumbLinkItem item={item} isLast={index === breadcrumb.length - 1} />
              {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))
        ) : (
          <>
            <BreadcrumbLinkItem item={firstItem} isLast={false} />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BreadcrumbEllipsis />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenItems.map((item) => (
                    <DropdownMenuItem key={item.url} asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbLinkItem item={lastItem} isLast={true} />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
