export async function analyzeLexicon({ text }) {
  // crude rarity proxy: proportion of words > 7 chars
  const words = (text.toLowerCase().match(/[a-zÀ-ÿ""""]+/g) || []);
  const long = words.filter(w => w.length > 7).length;
  const rarity = words.length ? long / words.length : 0;
  return { lexicon: { rarity } };
}
