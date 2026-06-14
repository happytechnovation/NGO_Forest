# Drop-in gallery images

To add a new photo to the website's Gallery page, just drop the image file into one
of the category folders below (create a new folder for a new category name).

```
src/assets/gallery/
├─ Forests/
├─ Landscapes/
├─ Projects/
├─ Community/
└─ Events/        ← example: a new category, just make the folder
```

- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- The folder name becomes the filter category shown on the Gallery page.
- The file name becomes the photo caption (e.g. `tree-planting-day.jpg` → "Tree Planting Day").
- After adding files, restart `npm run dev` (or just save — Vite picks new files up
  automatically) or run `npm run build` for production. No code or JSON changes needed.
