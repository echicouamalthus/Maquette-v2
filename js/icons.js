/* ============================================================
   IIPS Icons — SVG Inline Icon System
   Usage: <span class="icon"><!-- SVG --></span>
   ============================================================ */

/* We use inline SVGs for maximum flexibility. This file provides 
   helper functions to generate consistent icons. */

const ICONS = {
  dashboard: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="7" height="8" rx="1.5"/><rect x="11" y="2" width="7" height="5" rx="1.5"/><rect x="2" y="12" width="7" height="6" rx="1.5"/><rect x="11" y="9" width="7" height="9" rx="1.5"/></svg>`,
  
  contract: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z"/><path d="M12 2v5h5"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/></svg>`,
  
  subscription: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 17v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"/><circle cx="10" cy="6" r="3.5"/><line x1="15" y1="5" x2="15" y2="9"/><line x1="13" y1="7" x2="17" y2="7"/></svg>`,
  
  sinistre: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L2 7v9a2 2 0 002 2h12a2 2 0 002-2V7l-7-5z"/><path d="M10 18V11"/><path d="M7 14l3-3 3 3"/></svg>`,
  
  crm: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18v-1a3 3 0 00-3-3h-1"/><path d="M13 8a3 3 0 100-6"/><path d="M12 18v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1"/><circle cx="6.5" cy="6" r="3"/></svg>`,
  
  comptabilite: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="2" x2="10" y2="18"/><path d="M14 5H8.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H6"/></svg>`,
  
  paiement: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><line x1="2" y1="9" x2="18" y2="9"/></svg>`,
  
  ged: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16V6a2 2 0 00-2-2H9L7 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"/></svg>`,
  
  reporting: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="15" y1="5" x2="15" y2="15"/><line x1="10" y1="8" x2="10" y2="15"/><line x1="5" y1="11" x2="5" y2="15"/></svg>`,
  
  admin: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="3"/><path d="M17.4 12.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-1.42 3.42 2 2 0 01-1.42-.59l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V18a2 2 0 01-4 0v-.09A1.65 1.65 0 006.5 16.4a1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 011.2 15.4a2 2 0 01.59-1.42l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 010-4h.09A1.65 1.65 0 003.6 5.5a1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 014.6.2a2 2 0 011.42.59l.06.06a1.65 1.65 0 001.82.33H8A1.65 1.65 0 009 0V2a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06A2 2 0 0118.8 4.6a2 2 0 01-.59 1.42l-.06.06a1.65 1.65 0 00-.33 1.82V8a1.65 1.65 0 001.51 1H18a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  
  config: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/><circle cx="13" cy="5" r="2" fill="currentColor"/><circle cx="7" cy="10" r="2" fill="currentColor"/><circle cx="11" cy="15" r="2" fill="currentColor"/></svg>`,
  
  search: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="8" r="5.5"/><line x1="12.5" y1="12.5" x2="16" y2="16"/></svg>`,
  
  bell: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7a5 5 0 00-10 0c0 5-2.5 7-2.5 7h15S15 12 15 7z"/><path d="M8.5 17a1.5 1.5 0 003 0"/></svg>`,
  
  help: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M7.5 7.5a2.5 2.5 0 014.87.83c0 1.67-2.5 2.5-2.5 2.5"/><circle cx="10" cy="14" r="0.5" fill="currentColor"/></svg>`,
  
  plus: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="9" y1="3" x2="9" y2="15"/><line x1="3" y1="9" x2="15" y2="9"/></svg>`,
  
  filter: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polygon points="1,2 17,2 11,9 11,15 7,17 7,9"/></svg>`,
  
  download: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13v2a2 2 0 002 2h10a2 2 0 002-2v-2"/><polyline points="5,8 9,12 13,8"/><line x1="9" y1="2" x2="9" y2="12"/></svg>`,
  
  eye: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"/><circle cx="9" cy="9" r="2.5"/></svg>`,
  
  edit: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 2.5a2.121 2.121 0 013 3L6 15l-4 1 1-4z"/></svg>`,
  
  trash: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,5 15,5"/><path d="M13 5v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5"/><path d="M7 5V3a1 1 0 011-1h2a1 1 0 011 1v2"/></svg>`,
  
  chevronRight: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6,3 11,8 6,13"/></svg>`,
  
  chevronLeft: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="10,3 5,8 10,13"/></svg>`,

  dots: `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="9" cy="4" r="1.5"/><circle cx="9" cy="9" r="1.5"/><circle cx="9" cy="14" r="1.5"/></svg>`,
  
  check: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,8.5 6.5,12 13,4"/></svg>`,

  close: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>`,

  logout: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h3"/><polyline points="12,14 17,10 12,6"/><line x1="17" y1="10" x2="7" y2="10"/></svg>`,

  medical: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2a3 3 0 013 3v2h2a3 3 0 010 6h-2v2a3 3 0 01-6 0v-2H5a3 3 0 010-6h2V5a3 3 0 013-3z"/></svg>`,
  
  building: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2" width="14" height="16" rx="1"/><line x1="7" y1="6" x2="7" y2="6.01"/><line x1="10" y1="6" x2="10" y2="6.01"/><line x1="13" y1="6" x2="13" y2="6.01"/><line x1="7" y1="10" x2="7" y2="10.01"/><line x1="10" y1="10" x2="10" y2="10.01"/><line x1="13" y1="10" x2="13" y2="10.01"/><path d="M8 18v-4h4v4"/></svg>`,
  
  user: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="4"/><path d="M3 18v-1a7 7 0 0114 0v1"/></svg>`,

  stethoscope: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v5a5 5 0 0010 0V3"/><circle cx="15" cy="13" r="2"/><path d="M17 13v2a4 4 0 01-8 0v-1"/></svg>`,
};

// Helper function to get icon HTML
function icon(name) {
  return ICONS[name] || '';
}
