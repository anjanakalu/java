
# **Comprehensive Notes: Designing a Reusable Card Component**

## **1. Core Principles**
A reusable card component should:  
- **Adapt** to diverse content (products, users, blogs).  
- **Avoid Duplication** via DRY principles.  
- **Customize** through props for styling and behavior.  
- **Support Accessibility** with semantic HTML and keyboard navigation.  
- **Perform Efficiently** by minimizing re-renders and optimizing assets.

---

## **2. Prop Comparison: Product vs User Cards**

| **Prop**      | **Product Card Usage**      | **User Card Usage**       | **Purpose**                           |
|---------------|-----------------------------|---------------------------|---------------------------------------|
| `variant`     | `"product"` (default)       | `"user"`                  | Determines base styling and behavior  |
| `title`       | Product name                | User name                 | Primary identifying text              |
| `description` | Product features            | User bio/role             | Supporting details                    |
| `image`       | Product photo               | Avatar/Profile picture    | Visual representation (always include alt text) |
| `price`       | Displayed prominently       | Hidden                    | Cost information (product-specific)   |
| `icon`        | Cart/Add to basket          | Follow/Message            | Primary action visual cue             |
| `badge`       | `"Sale"`, `"New"`           | `"Online"`, `"Verified"`  | Status indicator                      |
| `footer`      | Additional CTAs             | Profile links             | Secondary actions                     |
| `className`   | Style overrides             | Style overrides           | Custom styling hook                   |
| `style`       | Inline adjustments          | Inline adjustments        | Runtime style modifications           |

---

## **3. Component Architecture**

### **A. Sub-Components**
- **`CardHeader`**: Image, badge, title.  
- **`CardBody`**: Description, price, content.  
- **`CardFooter`**: Buttons or custom JSX.

### **B. JSX Example**
```jsx
const Card = ({ variant = "product", title, description, image, price, badge, footer, className }) => {
  if (!title) throw new Error("Title is required");
  return (
    <article className={`card ${variant} ${className}`}>
      <CardHeader image={image} badge={badge} title={title} />
      <CardBody description={description} price={price} />
      <CardFooter>{footer}</CardFooter>
    </article>
  );
};
```
*Note*: Uses `<article>` for semantic HTML.

---

## **4. Styling Strategies**

### **A. Base + Variant CSS**
```css
.card {
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.card:hover { transform: translateY(-4px); }
.card.product { background: #fff; border: 1px solid #eee; }
.card.user { background: #f9f9f9; }
```

### **B. Theming with CSS Variables**
```css
:root {
  --card-bg: #fff;
  --card-text: #333;
  --card-border: #eee;
}
[data-theme="dark"] {
  --card-bg: #222;
  --card-text: #fff;
  --card-border: #444;
}
.card {
  background: var(--card-bg);
  color: var(--card-text);
  border: 1px solid var(--card-border);
}
```

### **C. Dynamic Classes**
```jsx
import cn from 'classnames';
const classes = cn('card', `card--${variant}`, className);
```

---

## **5. Props & Logic**

### **A. Validation**
```jsx
import PropTypes from 'prop-types';
Card.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
```

### **B. Defaults**
```jsx
Card.defaultProps = {
  variant: "product",
  badge: null,
  footer: null,
};
```

### **C. Conditional Rendering**
```jsx
{price && variant === "product" && <span className="card-price">{price}</span>}
{image && <img src={image} alt={title} loading="lazy" onError={(e) => (e.target.src = "/fallback.jpg")} />}
```
*Tip*: Add `onError` for broken images.

### **D. Accessibility**
- **ARIA**: `<button aria-label="Add to Cart">`.  
- **Role**: `<article role="button" tabIndex={0}>` for clickable cards.  
- **Keyboard**: Handle `onKeyDown` for Enter/Space.

### **E. Error Handling**
```jsx
if (!title) throw new Error("Title is required");
```

---

## **6. Performance**

- **Memoization**: `export default React.memo(Card);`.  
- **Lazy Images**: `<img loading="lazy" />`.  
- **CSS**: Add `contain: layout paint` to `.card`.

---

## **7. Testing**

- **Unit**: Check `title`, `price` rendering.  
- **Snapshot**: Compare `product` vs. `user` output.  
- **Accessibility**: Run `axe` for ARIA compliance.  
- **Errors**: Test missing `title` throws error.  

```jsx
test("renders price for product", () => {
  const { getByText } = render(<Card variant="product" title="Test" price="$10" />);
  expect(getByText("$10")).toBeInTheDocument();
});
```

---

## **8. Examples**

### **Product Card**
```jsx
<Card
  variant="product"
  title="Wireless Headphones"
  description="Noise-cancelling, 20hr battery"
  price="$99.99"
  image="/headphones.jpg"
  badge="Best Seller"
  footer={<button className="btn btn-primary">Add to Cart</button>}
/>
```

### **User Card**
```jsx
<Card
  variant="user"
  title="Jane Doe"
  description="UX Designer"
  image="/profile.jpg"
  footer={<button className="btn btn-secondary">Follow</button>}
/>
```

---

## **9. Key Takeaways**

- **Modular**: Use `Header/Body/Footer` for reusability.  
- **Styled**: Combine CSS variables and dynamic classes.  
- **Accessible**: Follow semantic and ARIA best practices.  
- **Performant**: Optimize with memoization and lazy loading.  
- **Scalable**: Plan for new variants (e.g., `blog`, `event`).

---

## **10. Version Context**
- **Date**: March 25, 2025.  
- **Tech**: Assumes React 18+, modern CSS, `PropTypes`, `classnames`.  
- **Future**: Adapt for React updates (e.g., Suspense, Server Components).

---

### Changes Made
1. **Replaced Table**: Swapped the old props table with your "Prop Comparison: Product vs User Cards" table, aligning it with the new heading "2. Prop Comparison: Product vs User Cards."
2. **Renamed Section**: Updated "Component Structure" to "Component Architecture" (now Section 3) per your input.
3. **Adjusted Numbering**: Shifted subsequent sections (e.g., "Styling Strategies" is now 4) to maintain flow.
4. **Consistency**: Ensured the new table integrates seamlessly with the concise, practical tone of the rest of the notes.
