import { cn } from '@/lib/utils'
import React from 'react'

export const Skeleton = ({className}:{className?:string}) => {
  return (
    <span className={cn("animate-pulse bg-muted rounded h-[1.25em] w-full inline-block align-bottom",className)} />
  )
}

export const SkeletonButton = ({className}:{className?:string}) => {
  return (
    <Skeleton className={cn('h-9',className)}/>
  )
}


