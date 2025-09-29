"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, 
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const themes = [
    {
        name: "Light",
        Icon: Sun,
        value: "light"
    },
    {
        name: "Dark",
        Icon: Moon,
        value: "dark"
    },
    {
        name: "System",
        Icon: Monitor,
        value: "system"
    },
]

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    // Avoid hydration mismatch by rendering a stable placeholder until mounted
    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                title="Toggle theme"
                disabled
            >
                <Sun className="h-4 w-4 opacity-0" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle theme"
                    title="Toggle theme"
                >
                    <span
                        className={`h-4 w-4 transition-transform duration-200 ${resolvedTheme === 'dark' ? '-rotate-90' : 'rotate-0'}`}
                    >
                        {resolvedTheme === 'dark' ? (
                            <Moon />
                        ) : (
                            <Sun />
                        )}
                    </span>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {themes.map(({ value, name, Icon }) => (
                    <DropdownMenuItem
                        key={value}
                        onSelect={() => setTheme(value)}
                        className={cn("cursor-pointer",theme==value&&"bg-accent text-accent-foreground")}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        {name}
                        {theme === value && (
                            <Check className="ml-auto h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
