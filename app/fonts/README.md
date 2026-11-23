# Emoji font subsets

`noto-emoji-{a,b,c}.woff2` are subsets of **Noto Color Emoji** (COLRv1), used only
by the Contact section (`components/ui/Emoji.tsx`, `app/emoji-font.ts`).

- Source: Noto Color Emoji from Google Fonts (the files `next/font/google` serves).
- Licence: SIL Open Font License 1.1 (https://openfontlicense.org). Subsetting is
  allowed; Noto Color Emoji has no reserved font name.
- Contents: only the emoji in `content/site.ts` under `contact`:

| File | Emoji | Code points |
| --- | --- | --- |
| `noto-emoji-a.woff2` | ✉️ 📄 🔗 📍 💼 | U+2709, U+1F4C4, U+1F517, U+1F4CD, U+1F4BC |
| `noto-emoji-b.woff2` | 🌍 | U+1F30D |
| `noto-emoji-c.woff2` | ✈️ | U+2708 |

## If you change the Contact emoji

The new emoji will fall back to the system emoji font until they are added here.
To add one: find which Google chunk has it, then subset it, e.g.

```bash
pip install fonttools brotli
python -m fontTools.subset <chunk>.woff2 --unicodes="U+XXXX,U+YYYY" \
  --flavor=woff2 --layout-features='*' --output-file=app/fonts/noto-emoji-d.woff2
```

(Temporarily switching `app/emoji-font.ts` to `next/font/google`'s `Noto_Color_Emoji`
puts the full chunks into `.next/static/media`; pick the chunk whose `cmap` has your
code point.) Then register the new file in `app/emoji-font.ts`, the `--font-emoji-*`
stack in `tailwind.config.ts`, and the `<html>` class in `app/layout.tsx`.

## Browser support

COLRv1 colour fonts work in Chrome, Edge and Firefox (and Android). Safari/iOS do not
support them, so there the emoji fall back to Apple Color Emoji. A font that renders
pixel-identically in Safari would have to be a bitmap/sbix font, which Google does not
publish for Noto.
