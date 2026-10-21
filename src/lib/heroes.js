export const CATS = [['q2', 'İkinci Qarabağ müharibəsi'], ['q1', 'Birinci Qarabağ müharibəsi'], ['diger', 'Digər döyüş və hadisələr']];
export const TITLES = ['Azərbaycanın Milli Qəhrəmanı', 'Vətən Müharibəsi Qəhrəmanı'];
export const COLORS = { q1: '#0A6E99', q2: '#1F6B4A', diger: '#8A5A2B' };
export const DK = { 'şəhid': ['Şəhid', 'Şəhid olub'], 'həlak': ['Vəfat edib', 'Vəfat edib'], 'vəfat': ['Vəfat edib', 'Vəfat edib'] };
export const fullName = (h) => `${h.fn} ${h.sn}`;
export const awardText = (h) => h.award || (h.tt === 1 ? 'Vətən Müharibəsi Qəhrəmanı' : 'verilib');
