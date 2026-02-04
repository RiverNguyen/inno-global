export function slugify(text: string) {
  return (
    text
      .toString()
      .toLowerCase()
      // bỏ dấu tiếng Việt
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // đ → d
      .replace(/đ/g, 'd')
      // bỏ ký tự đặc biệt
      .replace(/[^a-z0-9\s-]/g, '')
      // thay khoảng trắng bằng -
      .trim()
      .replace(/\s+/g, '-')
      // gộp nhiều dấu -
      .replace(/-+/g, '-')
  )
}
