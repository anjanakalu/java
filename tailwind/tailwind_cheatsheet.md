## **Tailwind CSS Cheatsheet**
### **🔗 Tailwind CSS Cheatsheet Index**  
1. [Layout](#1-layout)  
2. [Sizing](#2-sizing)  
3. [Spacing](#3-spacing)  
4. [Typography](#4-typography)  
5. [Colors](#5-colors)  
6. [Flexbox](#6-flexbox)  
7. [Grid](#7-grid)  
8. [Borders](#8-borders)  
9. [Effects](#9-effects)  
10. [Responsive Design](#10-responsive-design)  
11. [Arbitrary Values](#11-arbitrary-values)  
12. [Predefined Utilities](#12-predefined-utilities)  

--- 

Click any title to jump to its section! 🎯
### **1. Layout**
Controls how elements are positioned and displayed on the page. Use for structuring layouts and managing visibility.

#### **1.1 Display**
Display: Sets how an element is rendered in the layout. Use to define block-level, inline, or container behavior.
- `block` → `display: block`
- `inline` → `display: inline`
- `inline-block` → `display: inline-block`
- `hidden` → `display: none`
- `flex` → `display: flex`
- `grid` → `display: grid`

**Example:**
```html
<div class="block bg-gray-200">Block</div>
<span class="inline bg-yellow-300">Inline</span>
<div class="flex bg-blue-100"><div>Flex 1</div><div>Flex 2</div></div>
```

---

#### **1.2 Position**
Position: Defines an element’s positioning method. Use for layering, overlays, or sticky headers.
- `static` → Default positioning
- `relative` → Relative to normal position
- `absolute` → Relative to nearest positioned ancestor
- `fixed` → Fixed to viewport
- `sticky` → Sticks to position on scroll

**Example:**
```html
<div class="relative bg-red-200">Relative</div>
<div class="absolute top-0 bg-purple-300">Absolute</div>
```

---

#### **1.3 Top, Right, Bottom, Left**
Top, Right, Bottom, Left: Adjusts offset from edges for positioned elements. Use with absolute or fixed positioning.
- `top-0`, `right-2`, `bottom-4`, `left-6` → Positioning offsets (0 to 96)
- `inset-0` → All sides to 0
- `inset-y-2` → Top and bottom
- `inset-x-4` → Left and right

**Example:**
```html
<div class="absolute top-4 bg-blue-500"></div> <!-- 16px from top -->
<div class="absolute inset-0 bg-gray-300"></div> <!-- All sides 0 -->
```

---

#### **1.4 Z-Index**
Z-Index: Controls stacking order of overlapping elements. Use for layering popups or modals.
- `z-0`, `z-10`, `z-20`, ..., `z-50`
- `z-auto`

**Example:**
```html
<div class="z-10 bg-red-400">Above</div> <!-- Z-index 10 -->
```

---

### **2. Sizing**
Controls the width and height of elements. Use to manage dimensions of boxes, images, or containers.

#### **2.1 Height (`h-*`)**
Height: Sets element height. Use for fixed, percentage, or viewport-based heights.
- `h-0`, `h-1`, ..., `h-96` → Fixed heights (0 to 384px)
- `h-auto` → Content-driven height
- `h-full` → 100% of parent
- `h-screen` → 100% of viewport
- `h-min` → Min-content height
- `h-max` → Max-content height
- `h-fit` → Fit-content height
- `h-1/2`, `h-1/3`, `h-2/3`, etc. → Percentage heights
- `h-[150px]` → Custom height

**Example:**
```html
<div class="h-10 bg-blue-500"></div> <!-- 40px height -->
<div class="h-full bg-red-500"></div> <!-- Full parent height -->
```

---

#### **2.2 Width (`w-*`)**
Width: Sets element width. Use for fixed, percentage, or full-width layouts.
- `w-0`, `w-1`, ..., `w-96` → Fixed widths (0 to 384px)
- `w-auto` → Content-driven width
- `w-full` → 100% of parent
- `w-screen` → 100% of viewport
- `w-min` → Min-content width
- `w-max` → Max-content width
- `w-fit` → Fit-content width
- `w-1/2`, `w-1/3`, `w-2/3`, etc. → Percentage widths
- `w-[200px]` → Custom width

**Example:**
```html
<div class="w-20 bg-green-500"></div> <!-- 80px width -->
<div class="w-full bg-yellow-500"></div> <!-- Full parent width -->
```

---

#### **2.3 Min/Max Sizing**
Min/Max Sizing: Limits minimum or maximum dimensions. Use to prevent overflow or ensure responsiveness.
- `min-h-0`, `min-h-full`, `min-h-screen`
- `max-h-0`, `max-h-full`, `max-h-96`
- `min-w-0`, `min-w-full`
- `max-w-0`, `max-w-full`, `max-w-screen-xl`

**Example:**
```html
<div class="min-h-full bg-blue-200"></div> <!-- Min full height -->
```

---

### **3. Spacing**
Manages padding and margin around elements. Use for spacing out content or aligning elements.

#### **3.1 Padding (`p-*`)**
Padding: Adds internal spacing to elements. Use for padding buttons or containers.
- `p-0`, `p-1`, ..., `p-96` → All sides
- `px-2` → Horizontal (left + right)
- `py-4` → Vertical (top + bottom)
- `pt-6`, `pr-8`, `pb-10`, `pl-12` → Individual sides

**Example:**
```html
<div class="p-4 bg-gray-200"></div> <!-- 16px padding all sides -->
```

---

#### **3.2 Margin (`m-*`)**
Margin: Adds external spacing around elements. Use for gaps between items.
- `m-0`, `m-1`, ..., `m-96` → All sides
- `mx-2` → Horizontal
- `my-4` → Vertical
- `mt-6`, `mr-8`, `mb-10`, `ml-12` → Individual sides
- `-m-2`, `-mx-4` → Negative margin

**Example:**
```html
<div class="m-6 bg-red-200"></div> <!-- 24px margin all sides -->
```

---

#### **3.3 Space Between**
Space Between: Sets spacing between child elements. Use in flex or grid for consistent gaps.
- `space-x-4` → Horizontal spacing between children
- `space-y-6` → Vertical spacing between children

**Example:**
```html
<div class="flex space-x-4"><div class="bg-blue-500"></div><div class="bg-blue-500"></div></div>
```

---

### **4. Typography**
Customizes text properties like size, weight, and alignment. Use for formatting headings, paragraphs, or labels.

#### **4.1 Font Size (`text-*`)**
Font Size: Adjusts text size. Use for hierarchy in headings or body text.
- `text-xs` → 12px
- `text-sm` → 14px
- `text-base` → 16px
- `text-lg` → 18px
- `text-xl`, `text-2xl`, ..., `text-9xl`

**Example:**
```html
<p class="text-lg text-gray-800">Large</p> <!-- 18px text -->
```

---

#### **4.2 Font Weight (`font-*`)**
Font Weight: Sets text boldness. Use for emphasis or titles.
- `font-thin` → 100
- `font-normal` → 400
- `font-bold` → 700
- `font-black` → 900

**Example:**
```html
<p class="font-bold">Bold</p> <!-- Weight 700 -->
```

---

#### **4.3 Text Alignment**
Text Alignment: Aligns text horizontally. Use for centering titles or justifying paragraphs.
- `text-left`, `text-center`, `text-right`, `text-justify`

**Example:**
```html
<p class="text-center">Centered</p>
```

---

#### **4.4 Text Color**
Text Color: Changes text color. Use for visual distinction or theming.
- `text-gray-500`, `text-blue-600`, `text-red-700`
- `text-opacity-50` → Adjusts opacity

**Example:**
```html
<p class="text-blue-600">Blue text</p>
```

---

#### **4.5 Line Height (`leading-*`)**
Line Height: Controls spacing between text lines. Use for readability.
- `leading-none` → 1
- `leading-tight` → 1.25
- `leading-normal` → 1.5
- `leading-10` → Custom (2.5rem)

**Example:**
```html
<p class="leading-tight">Tight</p>
```

---

#### **4.6 Text Decoration**
Text Decoration: Adds lines to text. Use for links or strikethroughs.
- `underline`, `line-through`, `no-underline`

**Example:**
```html
<p class="underline">Underlined</p>
```

---

#### **4.7 Font Style**
Font Style: Applies italic formatting. Use for quotes or emphasis.
- `italic`, `not-italic`

**Example:**
```html
<p class="italic">Italic</p>
```

---

### **5. Colors**
Applies colors to backgrounds, borders, and text. Use for branding or visual emphasis.

#### **5.1 Background Color (`bg-*`)**
Background Color: Sets element background color. Use for buttons or sections.
- `bg-red-500`, `bg-green-600`, `bg-blue-700`
- `bg-opacity-25` → Adjusts opacity

**Example:**
```html
<div class="bg-red-500"></div> <!-- Red background -->
```

---

#### **5.2 Border Color**
Border Color: Sets border color. Use for outlines or highlights.
- `border-gray-300`, `border-teal-500`

**Example:**
```html
<div class="border border-gray-300"></div>
```

---

#### **5.3 Text Color**
Text Color: Sets text color. Use for readability or emphasis.
- `text-purple-600`, `text-yellow-400`

**Example:**
```html
<p class="text-purple-600">Purple</p>
```

---

#### **5.4 Gradient**
Gradient: Applies gradient backgrounds. Use for modern, decorative effects.
- `bg-gradient-to-r from-blue-500 to-purple-500`
- Directions: `to-t`, `to-tr`, `to-r`, `to-br`, etc.

**Example:**
```html
<div class="bg-gradient-to-r from-blue-500 to-purple-500"></div>
```

---

### **6. Flexbox**
Manages flexible layouts for aligning and distributing items. Use for responsive rows or columns.

#### **6.1 Flex Container**
Flex Container: Enables flexbox and sets direction. Use for flexible layouts.
- `flex` → Enable flexbox
- `flex-row`, `flex-col` → Direction
- `flex-wrap`, `flex-nowrap` → Wrapping behavior

**Example:**
```html
<div class="flex flex-col bg-blue-200"><div>Item 1</div><div>Item 2</div></div>
```

---

#### **6.2 Flex Items**
Flex Items: Controls how items grow or shrink. Use for dynamic sizing.
- `flex-1` → Flex grow/shrink
- `flex-auto`, `flex-initial`
- `flex-grow`, `flex-shrink`

**Example:**
```html
<div class="flex"><div class="flex-1 bg-red-300">Grows</div></div>
```

---

#### **6.3 Justify Content**
Justify Content: Aligns items along the main axis. Use for spacing or centering.
- `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly`

**Example:**
```html
<div class="flex justify-center"><div class="bg-green-400">Centered</div></div>
```

---

#### **6.4 Align Items**
Align Items: Aligns items along the cross axis. Use for vertical alignment.
- `items-start`, `items-end`, `items-center`, `items-baseline`, `items-stretch`

**Example:**
```html
<div class="flex items-center h-20 bg-yellow-200"><div>Aligned</div></div>
```

---

#### **6.5 Align Self**
Align Self: Overrides alignment for a single item. Use for exceptions in flex layouts.
- `self-auto`, `self-start`, `self-end`, `self-center`

**Example:**
```html
<div class="flex items-start"><div class="self-center bg-teal-300">Centered</div></div>
```

---

### **7. Grid**
Creates grid-based layouts for complex designs. Use for multi-column or multi-row structures.

#### **7.1 Grid Container**
Grid Container: Enables grid and defines columns/rows. Use for structured layouts.
- `grid` → Enable grid
- `grid-cols-1`, `grid-cols-2`, ..., `grid-cols-12`
- `grid-rows-1`, `grid-rows-2`, ...

**Example:**
```html
<div class="grid grid-cols-2"><div class="bg-blue-500"></div><div class="bg-blue-500"></div></div>
```

---

#### **7.2 Grid Gap**
Grid Gap: Sets spacing between grid cells. Use for consistent gaps.
- `gap-4`, `gap-x-6`, `gap-y-8`

**Example:**
```html
<div class="grid grid-cols-2 gap-6"><div class="bg-red-400"></div><div class="bg-red-400"></div></div>
```

---

#### **7.3 Grid Span**
Grid Span: Controls how items span across grid cells. Use for custom layouts.
- `col-span-2`, `row-span-3`
- `col-start-1`, `col-end-3`

**Example:**
```html
<div class="grid grid-cols-3"><div class="col-span-2 bg-purple-500"></div><div class="bg-purple-500"></div></div>
```

---

### **8. Borders**
Adds and styles borders around elements. Use for outlining or separating content.

#### **8.1 Border Width**
Border Width: Sets border thickness. Use for subtle or bold outlines.
- `border`, `border-0`, `border-2`, `border-4`, `border-8`
- `border-t-2`, `border-r-4` → Specific sides

**Example:**
```html
<div class="border-2 border-gray-400"></div> <!-- 2px border -->
```

---

#### **8.2 Border Radius**
Border Radius: Rounds element corners. Use for buttons or cards.
- `rounded`, `rounded-md`, `rounded-lg`, `rounded-full`
- `rounded-t-xl`, `rounded-bl-sm` → Specific corners

**Example:**
```html
<div class="rounded-lg bg-green-300"></div> <!-- Large radius -->
```

---

#### **8.3 Border Style**
Border Style: Changes border appearance. Use for dashed or dotted effects.
- `border-solid`, `border-dashed`, `border-dotted`

**Example:**
```html
<div class="border-2 border-dashed border-gray-600"></div>
```

---

### **9. Effects**
Applies visual effects like shadows or opacity. Use for depth or emphasis.

#### **9.1 Box Shadow**
Box Shadow: Adds shadows to elements. Use for elevation or focus.
- `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`
- `shadow-inner`

**Example:**
```html
<div class="shadow-lg bg-white p-4"></div>
```

---

#### **9.2 Opacity**
Opacity: Adjusts element transparency. Use for overlays or disabled states.
- `opacity-0`, `opacity-25`, `opacity-50`, ..., `opacity-100`

**Example:**
```html
<div class="opacity-75 bg-blue-500"></div>
```

---

#### **9.3 Visibility**
Visibility: Toggles element visibility. Use to hide elements without removing them.
- `visible`, `invisible`

**Example:**
```html
<div class="invisible">Not visible</div>
```

---

### **10. Responsive Design**
Adjusts styles based on screen size. Use for mobile-first or adaptive layouts.

#### **10.1 Breakpoints**
Breakpoints: Prefixes utilities for responsive behavior. Use to adapt styles across devices.
- `sm:` → 640px+
- `md:` → 768px+
- `lg:` → 1024px+
- `xl:` → 1280px+
- `2xl:` → 1536px+

**Example:**
```html
<div class="text-sm sm:text-lg md:bg-red-500 lg:flex">Responsive</div>
<!-- Small text on mobile, larger on sm+, red background on md+, flex on lg+ -->
```

---

### **11. Arbitrary Values**
Allows custom values for unique styling. Use when default utilities don’t suffice.

#### **11.1 Custom Values**
Custom Values: Applies specific values in brackets. Use for one-off styling needs.
- `w-[300px]`, `h-[50%]`, `text-[20px]`, `bg-[#1a2b3c]`

**Example:**
```html
<div class="w-[300px] bg-teal-400"></div>
```

---

### **12. Predefined Utilities**
Defines custom utilities in `tailwind.config.ts` for reusable styles. Use to standardize design patterns across projects.

#### **12.1 Custom Utilities**
Custom Utilities: Creates reusable classes. Use for consistent branding or components.
- Example utilities:
  - `.title-xl` → Large title style
  - `.spacing-custom` → Custom margin and padding

**Example:**
```html
<div class="title-xl spacing-custom bg-gray-100">Custom Title</div>
<div class="md:title-xl hover:spacing-custom bg-blue-200">Responsive Title</div>
```

---

### **Predefined Utilities Setup**
Add to `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.title-xl': {
          fontSize: '2rem', // 32px
          fontWeight: '700',
          lineHeight: '1.2',
        },
        '.spacing-custom': {
          margin: '1.5rem', // 24px
          padding: '0.75rem', // 12px
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
} satisfies Config;
```

**Better Example:**
```html
<button class="title-xl spacing-custom bg-blue-500 text-white rounded hover:bg-blue-700">
  Custom Button
</button>
<!-- Result: Large, bold text with custom spacing, blue background, and hover effect -->
```
