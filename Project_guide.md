You are an expert front-end engineer.  
I have a website that was mirrored using HTTrack, so right now I only have static HTML, CSS, JS, and assets.  
I want you to **convert this entire project into a modern React app using Vite with TypeScript**.  

Here are the requirements:

1. **Project Setup**
   - Use `npm create vite@latest my-site -- --template react-ts`.
   - Ensure TypeScript support is enabled by default.

2. **Assets Migration**
   - Copy all images, fonts, CSS, and JS from the mirrored project into the new Vite project.
   - Place global/static files in the `public/` folder.
   - Place reusable CSS inside `src/assets/` if needed.

3. **HTML → React Components**
   - For each `.html` file in the mirrored project:
     - Create a corresponding React component in `src/pages/`.
     - Example: `about.html` → `src/pages/About.tsx`.
     - Wrap the body content in a functional React component.
     - Fix invalid JSX:
       - `class=` → `className=`
       - Inline JS (`onclick`, `onchange`) → React props (`onClick`, `onChange`, etc).
       - Self-close `<img>` and other tags where required.

4. **Routing**
   - Install and configure React Router (`react-router-dom`).
   - Create routes for each page inside `App.tsx`.
   - Example:
     ```tsx
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
     </Routes>
     ```

5. **Shared Layout**
   - If the mirrored site has common sections (navbar, footer, sidebar), move them into `src/components/`.
   - Import them into pages so they’re reusable.

6. **JavaScript Conversion**
   - Any legacy `.js` code from the mirrored site should be converted into TypeScript React logic.
   - Replace `document.querySelector`, `getElementById`, or jQuery with React `useState`, `useEffect`, and `ref`.
   - Do not use direct DOM manipulation unless absolutely necessary.

7. **Testing**
   - Run the app with `npm run dev` and ensure all pages load.
   - All links should work using React Router instead of full-page reloads.
   - Images and CSS should load correctly.

8. **Output**
   - Provide me with the updated project structure.
   - Show me example code for one converted page (`About.tsx`).
   - Then list any manual fixes I might need to do (if CSS/JS had complex behaviors).

---

⚡ Deliverables:
- A **working Vite + React + TypeScript project** based on my mirrored site.
- All pages converted into React components with routing.
- Shared layout extracted into components.
- Clean, modern TypeScript React code instead of legacy inline JS.

---

