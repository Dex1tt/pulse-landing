import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  const navLinks = [
    { label: "Вкусы", href: "/#flavours" },
    { label: "Состав", href: "/#ingredients" },
    { label: "Наш подход", href: "/#promise" },
    { label: "Купить", href: "/#subscription" },
  ];
  const supportLinks = ["Контакты", "Вопросы и ответы", "Доставка", "Возврат"];
  const socialLinks = ["Instagram", "TikTok", "Twitter / X"];

  return (
    <footer id="footer" className="bg-ink pb-8 pt-20 text-soft-white md:pt-28">
      <div className="section-shell">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="PULSE — на главную"
              className="text-4xl font-extrabold tracking-[-0.06em] outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              <BrandMark withWord />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-soft-white/55">
              Чистая энергия для любопытных умов.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-soft-white/35">
              Разделы
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-sm text-soft-white/65 transition-colors hover:text-lime" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Поддержка">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-soft-white/35">
              Поддержка
            </p>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a className="text-sm text-soft-white/65 transition-colors hover:text-lime" href="#footer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Социальные сети">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-soft-white/35">
              Соцсети
            </p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link}>
                  <a className="text-sm text-soft-white/65 transition-colors hover:text-lime" href="#footer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 border-t border-soft-white/15 pt-7 text-xs font-medium text-soft-white/35 md:mt-28">
          © 2026 PULSE. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
