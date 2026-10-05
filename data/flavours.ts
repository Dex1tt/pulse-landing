export type FlavourColor = "lime" | "peach" | "berry";

export type Flavour = {
  slug: string;
  name: string;
  tagline: string;
  seoTagline: string;
  color: FlavourColor;
  description: string;
  seoDescription: string;
  ingredients: string[];
  price: string;
  image: string;
};

const sharedIngredients = [
  "Кофеин из зелёного чая",
  "L-теанин",
  "Электролиты",
  "Витамин B12",
  "Без сахара",
];

export const flavours: Flavour[] = [
  {
    slug: "lime-static",
    name: "Lime Static",
    tagline: "Яркий, свежий, слегка солоноватый.",
    seoTagline: "Sharp, bright, slightly salty.",
    color: "lime",
    description:
      "Lime Static соединяет лайм, ноту юдзу и щепотку морской соли — для чистого, электрического финиша.",
    seoDescription:
      "Lime Static mixes sharp lime, yuzu and sea salt for a clean, electric finish.",
    ingredients: [...sharedIngredients],
    price: "$3.20",
    image: "/images/can-lime.png",
  },
  {
    slug: "peach-signal",
    name: "Peach Signal",
    tagline: "Мягкие фрукты, ясная голова.",
    seoTagline: "Soft fruit, clear head.",
    color: "peach",
    description:
      "Peach Signal сочетает белый персик, жасмин и зелёный чай — для мягкой энергии и спокойного фокуса.",
    seoDescription:
      "Peach Signal blends white peach, jasmine and green tea for a soft, focused lift.",
    ingredients: [...sharedIngredients],
    price: "$3.20",
    image: "/images/can-peach.png",
  },
  {
    slug: "berry-mode",
    name: "Berry Mode",
    tagline: "Тёмные ягоды, свежий финиш.",
    seoTagline: "Dark berry, fresh finish.",
    color: "berry",
    description:
      "Berry Mode объединяет ежевику, чёрную смородину и базилик — для глубокого вкуса со свежим характером.",
    seoDescription:
      "Berry Mode combines blackberry, blackcurrant and basil for a dark, fresh edge.",
    ingredients: [...sharedIngredients],
    price: "$3.20",
    image: "/images/can-berry.png",
  },
];

export function getFlavourBySlug(slug: string) {
  return flavours.find((flavour) => flavour.slug === slug);
}
