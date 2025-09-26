# TODO: Fix CategoryEditPage.tsx Issues

- [x] Import brandSvc from brand.service.tsx
- [ ] Add state variables: categories and brands arrays
- [ ] In useEffect, add fetch for all categories and all brands
- [ ] Fix getCategory: set thumbUrl from category.icon.optimizedUrl || category.icon.url
- [ ] Populate parentId Select options with categories (filter out self ID)
- [ ] Populate brands Select options with brands
- [ ] Fix categoryFormSubmit: PUT to '/category/' + id, change toast to "updated"
- [ ] Test the changes by running the app
