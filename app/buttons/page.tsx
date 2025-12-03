import React from 'react'
import { Button } from '@/components/ui/button'

export default function ButtonsPage() {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>DEFAULT</Button>
      <Button variant="primary">PRIMARY</Button>
      <Button variant="primaryOutline" >PRIMARY OUTLINE</Button>
      <Button variant="secondary">SECONDARY</Button>
      <Button variant="secondaryOutline">SECONDARY OUTLINE</Button>
      <Button variant="danger">DANGER</Button>
      <Button variant="dangerOutline">DANGER OUTLINE</Button>
      <Button variant="super">SUPER</Button>
      <Button variant="superOutline">SUPER OUTLINE</Button>
      <Button variant="ghost">GHOST</Button>
      <Button variant="sidebar">SIDEBAR</Button>
      <Button variant="sidebarOutline">SIDEBAR OUTLINE</Button>
    </div>
  )
}
