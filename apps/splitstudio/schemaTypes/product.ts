import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),

    defineField({ name: 'price', type: 'number', validation: r => r.required().min(0) }),

    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),

    defineField({ name: 'description', type: 'text' }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tee', value: 'tee' },
          { title: 'Long Sleeve', value: 'long-sleeve' },
          { title: 'Pants', value: 'pants' },
          { title: 'Socks', value: 'socks' },
        ],
        layout: 'dropdown',
      },
      validation: r => r.required(),
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
          { title: 'Navy', value: 'navy' },
          { title: 'Grey', value: 'grey' },
          { title: 'Red', value: 'red' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Brown', value: 'brown' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'gender',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Unisex', value: 'unisex' },
          { title: 'Kids', value: 'kids' },
        ],
        layout: 'dropdown',
      },
      validation: r => r.required(),
    }),

    // ✅ size variants with stock (+ optional per-variant extras)
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        defineField({
          name: 'variant',
          type: 'object',
          fields: [
            defineField({
              name: 'size',
              type: 'string',
              options: {
                list: ['XS','S','M','L','XL','XXL'],
                layout: 'dropdown',
              },
              validation: r => r.required(),
            }),
            defineField({
              name: 'stock',
              type: 'number',
              validation: r => r.required().min(0),
            }),
            defineField({ name: 'sku', type: 'string' }),
            defineField({ name: 'price', type: 'number', description: 'Override base price (optional)' }),
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'size', subtitle: 'sku', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: `Size: ${title}`, subtitle, media };
            },
          },
        }),
      ],
      validation: r => r.min(1),
    }),
  ],

  preview: {
    select: { title: 'title', media: 'image', subtitle: 'category' },
  },
});
