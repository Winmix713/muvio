import type React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilePlus, Link, Pencil, Trash } from "lucide-react"

const iconClasses = "mr-2 h-4 w-4"

const ActionsDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-popover shadow-xl border-border">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FilePlus className={iconClasses} />
            <div className="flex flex-col">
              <span>New file</span>
              <span className="text-xs text-muted-foreground">Create a new file</span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className={iconClasses} />
            <div className="flex flex-col">
              <span>Copy link</span>
              <span className="text-xs text-muted-foreground">Copy the file link</span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">⌘C</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className={iconClasses} />
            <div className="flex flex-col">
              <span>Edit file</span>
              <span className="text-xs text-muted-foreground">Allows you to edit the file</span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">⌘⇧E</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash className={`${iconClasses} text-destructive`} />
          <div className="flex flex-col">
            <span>Delete file</span>
            <span className="text-xs text-muted-foreground">Permanently delete the file</span>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">⌘⇧D</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionsDropdown

