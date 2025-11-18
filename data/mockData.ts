import type { Player, Team, Match, Drill, TrainingSession, ChatMessage, Product, BeginnerGuide, User } from '../types';
import { MatchStatus, DrillDifficulty } from '../types';

export const mockUser: User = {
  id: 1,
  name: 'Pelatih Alex',
  email: 'coach@volleyapp.com',
  avatarUrl: `https://i.pravatar.cc/150?u=coach-alex`,
};

export const players: Player[] = [
  { id: 1, name: 'Ahmad Rizki', number: 1, position: 'Setter', stats: { totalPoints: 145, aces: 28, blocks: 15, errors: 12, efficiency: 92 } },
  { id: 2, name: 'Cahya Gumilang', number: 3, position: 'Middle Blocker', stats: { totalPoints: 210, aces: 15, blocks: 45, errors: 20, efficiency: 88 } },
  { id: 3, name: 'Dedi Firmansyah', number: 4, position: 'Outside Hitter', stats: { totalPoints: 305, aces: 35, blocks: 22, errors: 30, efficiency: 90 } },
  { id: 4, name: 'Eko Prasetyo', number: 7, position: 'Libero', stats: { totalPoints: 25, aces: 2, blocks: 5, errors: 5, efficiency: 95 } },
  { id: 5, name: 'Budi Santoso', number: 5, position: 'Outside Hitter', stats: { totalPoints: 256, aces: 20, blocks: 18, errors: 25, efficiency: 85 } },
  { id: 6, name: 'Fajar Maulana', number: 9, position: 'Opposite', stats: { totalPoints: 280, aces: 40, blocks: 25, errors: 28, efficiency: 89 } },
  { id: 7, name: 'Gede Wira', number: 10, position: 'Middle Blocker', stats: { totalPoints: 190, aces: 10, blocks: 50, errors: 18, efficiency: 91 } },
  { id: 8, name: 'Hadi Susanto', number: 11, position: 'Setter', stats: { totalPoints: 130, aces: 25, blocks: 10, errors: 15, efficiency: 93 } },
  { id: 9, name: 'Indra Wijaya', number: 12, position: 'Outside Hitter', stats: { totalPoints: 220, aces: 30, blocks: 20, errors: 22, efficiency: 87 } },
];

export const team: Team = {
  id: 1,
  name: 'Garuda Volley',
  category: 'Professional',
  roster: players,
};

export const matches: Match[] = [
  { id: 1, teamA: 'Garuda Volley', teamB: 'Nusantara Smashers', date: '2025-10-05', time: '15:00', location: 'GOR Bhinneka', status: MatchStatus.UPCOMING },
  { id: 2, teamA: 'Jakarta Thunder', teamB: 'Garuda Volley', date: '2025-10-08', time: '18:00', location: 'Istora Senayan', status: MatchStatus.UPCOMING },
  { id: 3, teamA: 'Garuda Volley', teamB: 'Bandung Strikers', date: '2025-09-28', time: '19:00', location: 'GOR Saparua', status: MatchStatus.COMPLETED, result: { teamAScore: 3, teamBScore: 1 } },
  { id: 4, teamA: 'Surabaya Power', teamB: 'Garuda Volley', date: '2025-09-21', time: '16:00', location: 'DBL Arena', status: MatchStatus.COMPLETED, result: { teamAScore: 2, teamBScore: 3 } },
];

export const drills: Drill[] = [
  { id: 1, title: 'Spike Technique Training', category: 'Attacking', description: 'Latihan teknik spike untuk meningkatkan power dan akurasi', difficulty: DrillDifficulty.INTERMEDIATE, duration: 30, playerCount: '6-8 pemain' },
  { id: 2, title: 'Blocking Drill', category: 'Defense', description: 'Latihan blocking timing dan positioning untuk pertahanan yang solid', difficulty: DrillDifficulty.ADVANCED, duration: 45, playerCount: '4-6 pemain' },
  { id: 3, title: 'Serve and Receive', category: 'Serving', description: 'Fokus pada akurasi servis dan efektivitas penerimaan bola pertama', difficulty: DrillDifficulty.BEGINNER, duration: 25, playerCount: 'Seluruh tim' },
  { id: 4, title: 'Setter Precision Practice', category: 'Setting', description: 'Meningkatkan konsistensi dan akurasi umpan setter ke berbagai posisi', difficulty: DrillDifficulty.INTERMEDIATE, duration: 30, playerCount: '2-4 pemain' },
];

export const trainingSessions: TrainingSession[] = [
    {id: 1, title: "Team Practice", date: "2025-10-03", time: "17:00", location: "GOR Bhinneka"},
    {id: 2, title: "Defensive Drills", date: "2025-10-06", time: "18:00", location: "Istora Senayan"},
];

export const chatMessages: ChatMessage[] = [
    { id: 1, senderId: 3, senderName: 'Dedi F.', text: 'Guys, jangan lupa latihan besok jam 5 sore di GOR Bhinneka ya.', timestamp: '10:30 AM'},
    { id: 2, senderId: 1, senderName: 'Ahmad R.', text: 'Siap, Ded. Fokus ke set play baru kita ya.', timestamp: '10:31 AM'},
    { id: 3, senderId: 0, senderName: 'Coach', text: 'Betul, Ahmad. Pastikan semua sudah paham formasinya. Saya akan pantau dari pinggir lapangan.', timestamp: '10:35 AM'},
    { id: 4, senderId: 2, senderName: 'Cahya G.', text: 'Coach, untuk blocking, apa ada strategi khusus melawan Nusantara Smashers?', timestamp: '10:36 AM'},
    { id: 5, senderId: 0, senderName: 'Coach', text: 'Ada, nanti kita bahas di sesi teori sebelum latihan fisik. Pastikan datang tepat waktu.', timestamp: '10:38 AM'},
    { id: 6, senderId: 4, senderName: 'Eko P.', text: 'Diterima, Coach! Saya akan fokus pada receive drill.', timestamp: '10:40 AM'},
];

export const products: Product[] = [
  { id: 1, name: 'Jersey Tim Pro', price: 350000, imageUrl: 'https://images.unsplash.com/photo-1612892022396-c63f0b3d1b64?q=80&w=1887&auto=format&fit=crop', category: 'Apparel', description: 'Jersey resmi tim dengan bahan dry-fit berkualitas tinggi, menyerap keringat dan nyaman dipakai saat bertanding.', rating: 4.8 },
  { id: 2, name: 'Sepatu Voli SkyJump', price: 850000, imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d34?q=80&w=1887&auto=format&fit=crop', category: 'Footwear', description: 'Sepatu voli dengan teknologi bantalan responsif untuk lompatan maksimal dan cengkeraman kuat di lapangan.', rating: 4.9 },
  { id: 3, name: 'Bola Voli PowerServe', price: 500000, imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop', category: 'Equipment', description: 'Bola voli standar internasional, terbuat dari kulit sintetis premium untuk kontrol dan feel yang luar biasa.', rating: 4.7 },
  { id: 4, name: 'Knee Pad Pelindung', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1578336231926-169f4a0818e3?q=80&w=1887&auto=format&fit=crop', category: 'Accessories', description: 'Pelindung lutut dengan busa EVA tebal untuk perlindungan optimal dari benturan saat melakukan diving.', rating: 4.6 },
  { id: 5, name: 'Tas Ransel Voli', price: 450000, imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', description: 'Tas ransel luas dengan kompartemen khusus untuk sepatu, bola, dan pakaian basah. Praktis dan stylish.', rating: 4.8 },
];

export const beginnerGuides: BeginnerGuide[] = [
  {
    id: 1,
    title: 'Pengenalan Posisi Pemain',
    description: 'Memahami 6 zona rotasi dan peran setiap pemain (Setter, Spiker, Libero).',
    imageUrl: 'https://images.unsplash.com/photo-1628891399194-58652e378898?q=80&w=2070&auto=format&fit=crop',
    steps: [
      { title: 'Zona Rotasi', detail: 'Lapangan dibagi menjadi 6 zona (1-6). Rotasi dilakukan searah jarum jam setiap kali tim memenangkan servis.' },
      { title: 'Setter (Tosser)', detail: 'Otak permainan. Bertugas memberikan umpan (setting) kepada spiker untuk menyerang.' },
      { title: 'Libero', detail: 'Pemain spesialis pertahanan. Menggunakan jersey berbeda, tidak boleh melakukan servis atau smash, fokus pada receive & dig.' },
      { title: 'Spiker (Hitter)', detail: 'Terbagi menjadi Outside Hitter (Open), Opposite, dan Middle Blocker (Quicker) yang bertugas mencetak poin.' },
    ],
  },
  {
    id: 2,
    title: 'Teknik Dasar Passing Bawah',
    description: 'Kunci pertahanan dan penerimaan bola pertama (Receive).',
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2070&auto=format&fit=crop',
    steps: [
      { title: 'Sikap Kuda-kuda', detail: 'Buka kaki selebar bahu, tekuk lutut, dan condongkan badan ke depan. Jaga punggung tetap lurus.' },
      { title: 'Posisi Tangan', detail: 'Satukan kedua ibu jari sejajar, luruskan lengan ke depan bawah, dan kunci siku.' },
      { title: 'Perkenaan Bola', detail: 'Pastikan bola mengenai bagian lengan bawah di atas pergelangan tangan, bukan di kepalan tangan.' },
      { title: 'Gerakan Tubuh', detail: 'Dorong bola dengan meluruskan lutut (mengayun dari kaki), hindari mengayunkan lengan terlalu tinggi (melebihi bahu).' },
    ],
  },
  {
    id: 3,
    title: 'Teknik Passing Atas (Setting)',
    description: 'Cara memberikan umpan lambung yang akurat menggunakan jari-jari.',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2007&auto=format&fit=crop',
    steps: [
      { title: 'Posisi Siap', detail: 'Bergerak cepat ke bawah bola. Posisikan dahi tepat di bawah arah jatuhnya bola.' },
      { title: 'Bentuk Jari', detail: 'Buka jari-jari membentuk mangkuk atau segitiga di depan dahi. Siku ditekuk ke samping luar.' },
      { title: 'Sentuhan', detail: 'Gunakan bantalan jari (terutama ibu jari, telunjuk, tengah) untuk menyentuh bola. Jangan gunakan telapak tangan.' },
      { title: 'Dorongan', detail: 'Dorong bola ke atas dengan meluruskan lengan dan kaki secara bersamaan untuk tenaga tambahan.' },
    ],
  },
  {
    id: 4,
    title: 'Teknik Servis Atas (Overhand)',
    description: 'Memulai permainan dengan pukulan keras dari garis belakang.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop',
    steps: [
      { title: 'Posisi Awal', detail: 'Berdiri tegak di belakang garis, kaki kiri di depan (untuk pemukul kanan). Pegang bola dengan tangan kiri.' },
      { title: 'Toss (Lemparan)', detail: 'Lambungkan bola lurus ke atas depan kepala, setinggi jangkauan lengan lurus.' },
      { title: 'Ayunan', detail: 'Tarik tangan pemukul ke belakang telinga, siku ditekuk, telapak tangan terbuka kaku.' },
      { title: 'Pukulan', detail: 'Pukul bola di titik tertinggi dengan telapak tangan penuh. Pindahkan berat badan ke depan untuk power.' },
    ],
  },
  {
    id: 5,
    title: 'Dasar Smash / Spike',
    description: 'Teknik serangan utama untuk mematikan lawan.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    steps: [
      { title: 'Awalan (Approach)', detail: 'Lakukan 3 langkah awalan (Kiri-Kanan-Kiri untuk pemukul kanan) untuk membangun momentum.' },
      { title: 'Lompatan', detail: 'Hentakkan kedua kaki bersamaan, ayunkan kedua tangan ke atas untuk melompat setinggi mungkin.' },
      { title: 'Pukulan', detail: 'Tarik tangan pemukul ke belakang, lalu ayunkan secepat mungkin (seperti mencambuk) mengenai bagian atas bola.' },
      { title: 'Pendaratan', detail: 'Mendarat dengan kedua kaki mengeper (lutut ditekuk) untuk mencegah cedera, jangan menyentuh net.' },
    ],
  },
];