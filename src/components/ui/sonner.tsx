"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--primary)",
          "--success-text": "var(--primary-foreground)",
          "--success-border": "var(--accent)",
          "--border-width": "2px",
          "--font": "var(--font-roboto)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
