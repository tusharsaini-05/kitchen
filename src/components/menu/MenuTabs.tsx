"use client"

import type React from "react"
import { Box, Tabs, Tab } from "@mui/material"

interface MenuTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export const MenuTabs: React.FC<MenuTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onCategoryChange(categories[newValue])
  }

  const activeIndex = categories.indexOf(activeCategory)

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={activeIndex !== -1 ? activeIndex : 0}
        onChange={handleChange}
        aria-label="menu categories"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#3366FF",
            height: 3,
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category}
            label={category}
            sx={{
              textTransform: "none",
              fontWeight: "medium",
              color: (theme) => theme.palette.text.primary,
              "&.Mui-selected": {
                color: "#3366FF",
                fontWeight: "medium",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

