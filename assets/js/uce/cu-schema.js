export const CU_VERSION = "1.0.0";

export function normalizeCU(cu = {}) {
  const now = new Date().toISOString();
  return {
    id: cu.id || cryptoRandomId(),
    version: CU_VERSION,
    kind: cu.kind || "observation",   // observation | symbol | dialogue | analysis
    modality: cu.modality || "text",  // text | image | glyph | mixed
    source: {
      url: str(cu.source?.url),
      title: str(cu.source?.title),
      author: str(cu.source?.author),
      work_id: str(cu.source?.work_id),
    },
    context: {
      page: str(cu.context?.page),
      pane: str(cu.context?.pane),    // ground | energy | sign
      seed: str(cu.context?.seed),
      family: str(cu.context?.family),
      time: cu.context?.time || now,
    },
    payload: cu.payload ?? {},
    provenance: {
      engine: str(cu.provenance?.engine), // "glyphs@option-d", "chamber@simulacra"
      hash: str(cu.provenance?.hash),
    }
  };
}

export function validateCU(cu) {
  return !!(cu && cu.id && cu.kind && cu.modality);
}

function str(v){ return (typeof v === "string" && v) ? v : undefined; }
function cryptoRandomId(){
  try { return crypto.randomUUID(); } catch {
    return 'cu-'+Math.random().toString(36).slice(2);
  }
}