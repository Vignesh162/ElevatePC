const productsData = [
    // ====== CPUs ======
    {
      id: 1,
      name: "Intel Core i5 12600K",
      price: 23000,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQVcvjLJNAwcR_CIXHIE7gNjVf7RxohHW4zNWXkr04tpSG5FiRgviK_7yOgfnZgB3mLMEBkxRzeOgh2I-ufbts-zkVBK4Iieaw42QTeMYxiBeI95BwVVu1Z1w",
      rating: 4.5,
      reviews: 120,
      category: "CPU",
      brand: "Intel",
      details: {
        cores: 10,
        threads: 16,
        baseClock: "3.7 GHz",
        boostClock: "4.9 GHz",
        socket: "LGA1700",
        tdp: "125W",
        description: "Great mid-range processor with hybrid architecture for gaming and productivity."
      }
    },
    {
      id: 2,
      name: "Intel Core i7 12700K",
      price: 32000,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmtvSdb0SZBWRIwx2xnhK4L-0F7cWcRP2ta_0wrIxtf0cqTEMAiWrfXpXBsdwKcvRwC3lUTEwT6YoBbvTR_gVUaBi6Bgcz2-zCS0-kOfFpd93ydF_G5fdIDg",
      rating: 4.7,
      reviews: 95,
      category: "CPU",
      brand: "Intel",
      details: {
        cores: 12,
        threads: 20,
        baseClock: "3.6 GHz",
        boostClock: "5.0 GHz",
        socket: "LGA1700",
        tdp: "125W",
        description: "High-performance CPU suitable for gaming and professional workloads."
      }
    },
    {
      id: 3,
      name: "AMD Ryzen 5 5600X",
      price: 20000,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS2f5AaIsJOsrq1YWiVNk7aTztiTPzIJP2YOtd6Fl2sbG7vooZGxhV3TklfaEXT9FhVxSRDevnF85tDyXq0K7rq3uRkuD0NYHYMSdJ0On1JLlm-8W9CyWRlww",
      rating: 4.6,
      reviews: 110,
      category: "CPU",
      brand: "AMD",
      details: {
        cores: 6,
        threads: 12,
        baseClock: "3.7 GHz",
        boostClock: "4.6 GHz",
        socket: "AM4",
        tdp: "65W",
        description: "Efficient and affordable CPU, perfect for mid-range gaming builds."
      }
    },
    { id: 4, 
      name: "AMD Ryzen 7 5800X", 
      price: 30000, 
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS0ttfUP_MNwuDpYYF7kxQ554rIrVBESu17WPdyWPxmQMxQM-A4q6d0h__vUSGVLyBU0W9dMAcC38ryb-HC8NPcEczAn4DNCCJucDJYSe3e1q_ibf0wFsgLEw", 
      rating: 4.8, 
      reviews: 85, 
      category: "CPU", 
      brand: "AMD" 
    }, 
    { id: 5, 
      name: "Intel Core i9 12900K", 
      price: 55000, 
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQOC9myi5Qp6gW5lWGP9TIbfcQYbHQQSHsmdX1uAtV5Jt9YjxZhgEzYcFQyZWWdBavU7F3ZvPJkBei7HMLjkmnmEfOwQCDTccbK78Ort1Q", 
      rating: 4.9, 
      reviews: 60, 
      category: "CPU", 
      brand: "Intel" 
    },

    // ====== GPUs ======
    {
      id: 6,
      name: "NVIDIA RTX 4070",
      price: 55000,
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTAqJOZIkB4T4OK4Fj5RUqo2YXONGP9vm7puOvHJ1tow3lFSKDrB_lHmeOWAM2Rj_4dD98mG9hPNWIEHZA0VcbUSU4DVhEP2_919OQXEeV0_NjvIxF-tS_DwA",
      rating: 4.8,
      reviews: 67,
      category: "GPU",
      brand: "NVIDIA",
      details: {
        vram: "12GB GDDR6X",
        boostClock: "2.48 GHz",
        cudaCores: 5888,
        power: "200W",
        description: "Powerful GPU for 1440p and entry-level 4K gaming with DLSS 3 support."
      }
    },
    {
      id: 7,
      name: "NVIDIA RTX 4080",
      price: 95000,
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSw_vd-h7VXGGtVVMIACedkpUgSmzGpPjrEs_q28nDWCl7SXA2hWPYDeAwyf21pr7UVtb6Lie2quw3h44VqEUgsgyLYT5B6W4Asf-Lx91e_gFnSWDk0HA63TQ",
      rating: 4.9,
      reviews: 55,
      category: "GPU",
      brand: "NVIDIA",
      details: {
        vram: "16GB GDDR6X",
        boostClock: "2.51 GHz",
        cudaCores: 9728,
        power: "320W",
        description: "Enthusiast-grade GPU for high FPS 4K gaming and creative workloads."
      }
    },
    {
      id: 8,
      name: "AMD Radeon RX 6800",
      price: 48000,
      image: "https://m.media-amazon.com/images/I/61kUF-gOHeL._UF1000,1000_QL80_.jpg",
      rating: 4.7,
      reviews: 72,
      category: "GPU",
      brand: "AMD",
      details: {
        vram: "16GB GDDR6",
        boostClock: "2.25 GHz",
        streamProcessors: 3840,
        power: "250W",
        description: "Excellent GPU for 1440p and 4K gaming with high VRAM for future-proofing."
      }
    },
    // ====== GPUs ======
  { 
    id: 9, 
    name: "AMD Radeon RX 6900 XT", 
    price: 70000, 
    image: "https://m.media-amazon.com/images/I/71FC-4x5HiL.jpg", 
    rating: 4.8, 
    reviews: 50, 
    category: "GPU", 
    brand: "AMD", 
    details: {
      memory: "16GB GDDR6",
      clockSpeed: "Up to 2250 MHz",
      ports: "HDMI 2.1, DisplayPort 1.4a",
      features: ["Ray Tracing", "DirectX 12 Ultimate", "VR Ready"]
    }
  },
  { 
    id: 10, 
    name: "NVIDIA RTX 3060 Ti", 
    price: 32000, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcShg_8I3enVrAiN6MVDS5kKKPWMevWw6Rh1Em0FO9Gg91zDGQw6PoUoB7tOEmtZeJf8F2kBvaDhgsfjgXE3qavXKXcgBsI9nIbwVIlxl9XxrZlCJdIK_JUfMg", 
    rating: 4.5, 
    reviews: 80, 
    category: "GPU", 
    brand: "NVIDIA", 
    details: {
      memory: "8GB GDDR6",
      clockSpeed: "Boost Clock 1665 MHz",
      ports: "HDMI 2.1, DisplayPort 1.4a",
      features: ["Ray Tracing", "DLSS", "VR Ready"]
    }
  },

  // ====== RAM ======
  { 
    id: 11, 
    name: "Corsair Vengeance 16GB (2x8GB)", 
    price: 8000, 
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRDPj8vRR96xhfUXnJ_Nbz8YN5WwWZqOo2V6ps4_agHzO3uroArRosUajcKzcniL5Eh16-U9V4uzbWg5sGj8TT2VAlZnqXTbNd6bJ7QlqYypE40Vd_htZdD0Q", 
    rating: 4.6, 
    reviews: 140, 
    category: "RAM", 
    brand: "Corsair", 
    details: {
      type: "DDR4",
      speed: "3200 MHz",
      modules: "2 x 8GB",
      features: ["Low profile design", "XMP 2.0 support"]
    }
  },
  { 
    id: 12, 
    name: "G.SKILL Trident Z RGB 16GB (2x8GB)", 
    price: 8500, 
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQPMgerYyT7jG5YWjDLyHD3aU8r5EWtQEHxNemK1EQecVa3fAgdxFC5pGAqYk8RX6ZwLew8PL5oSThsoux4nBTFUhGKKYyp9pnvqKhj-HK9MVadtFQCQgv1mw", 
    rating: 4.7, 
    reviews: 125, 
    category: "RAM", 
    brand: "G.SKILL", 
    details: {
      type: "DDR4",
      speed: "3600 MHz",
      modules: "2 x 8GB",
      features: ["RGB lighting", "Great for overclocking"]
    }
  },
  { 
    id: 13, 
    name: "Kingston Fury Beast 16GB", 
    price: 7800, 
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcScPcWnt3_EbQnAIIYVgxUFs-YbfOi2MW5R08wMcbfY6h0wgXI239oF4imh1IW1h_Mx6WDCVPCrMksSAxSbC7ntMg2pKnruPSAokFdw078RLyTcOZfpmHOmTg", 
    rating: 4.5, 
    reviews: 110, 
    category: "RAM", 
    brand: "Kingston", 
    details: {
      type: "DDR4",
      speed: "3200 MHz",
      modules: "1 x 16GB",
      features: ["Plug N Play auto-overclocking", "Heat spreader design"]
    }
  },
  { 
    id: 14, 
    name: "Crucial Ballistix 16GB", 
    price: 7900, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS50Z3rsmisYags8rq7cSIxTe4xYTbVKPjJFMOW_YhqaQLmkRpUYlbCFlYU3ao7x5gq0iL0gaGIm-KD9A7BsgGB9VYMIj9UMCBiSavcg5mummrZAXjTu9RB", 
    rating: 4.6, 
    reviews: 95, 
    category: "RAM", 
    brand: "Crucial", 
    details: {
      type: "DDR4",
      speed: "3200 MHz",
      modules: "2 x 8GB",
      features: ["Tight latency tuning", "Built for gamers and enthusiasts"]
    }
  },
  { 
    id: 15, 
    name: "Patriot Viper Steel 16GB", 
    price: 8200, 
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT4VTVYpmCgEsns6DDUsXUWl3VBIn2jNtljtnajMw-vY4gjowrSicZGL4Jm57AdEvLWSUt8aQZuJcetLDM-YcrdO76yRYeLApff7QuUokJIPogRqoeEqIDY", 
    rating: 4.6, 
    reviews: 100, 
    category: "RAM", 
    brand: "Patriot", 
    details: {
      type: "DDR4",
      speed: "3600 MHz",
      modules: "2 x 8GB",
      features: ["Designed for gamers", "Excellent heat spreaders"]
    }
  },


    // ====== Storage ======
  { 
    id: 16, 
    name: "Samsung 970 EVO 1TB", 
    price: 9000, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYoWzr1974zWAivntb0sOP1g0bTkp8ZynG-uOqNdtBw-96khi-3hZI1H9gcecYYFXSDm7vUm6XjsNXRhbzZPqD4JOvQfaGBxSrOiHdtciNgeprCOflc0BIsQ", 
    rating: 4.7, 
    reviews: 130, 
    category: "Storage", 
    brand: "Samsung", 
    details: {
      type: "NVMe SSD",
      interface: "PCIe Gen3 x4",
      readSpeed: "3500 MB/s",
      writeSpeed: "3300 MB/s",
      endurance: "600 TBW",
      features: ["Samsung V-NAND", "Magician Software"]
    }
  },
  { 
    id: 17, 
    name: "WD Black SN850 1TB", 
    price: 9500, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTTUNt0Y1hbmakc3q0hUzZseYnkTPMCMtfUhP1TZ4J6Q4q4FgcQ2BX9Kwkk7aEaCJBk9fS29Wmu42MKaExjE2NDmd9iyGafbNQiUJuExZDUZfcRBszpe1EBPg", 
    rating: 4.8, 
    reviews: 110, 
    category: "Storage", 
    brand: "Western Digital", 
    details: {
      type: "NVMe SSD",
      interface: "PCIe Gen4 x4",
      readSpeed: "7000 MB/s",
      writeSpeed: "5300 MB/s",
      endurance: "600 TBW",
      features: ["Game Mode 2.0", "Heatsink option"]
    }
  },
  { 
    id: 18, 
    name: "Crucial P5 1TB", 
    price: 8700, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfyoenrCmyLUV-TBhzGKrCw94iMsD1HiOXafHL_pDnyjKFO9wH590Cyuo_RN8nSLOIj13Lvmmph7AxvmhE65BDV9sinUhOTswtW-B66oWpabZBXr-YRq0e", 
    rating: 4.5, 
    reviews: 120, 
    category: "Storage", 
    brand: "Crucial", 
    details: {
      type: "NVMe SSD",
      interface: "PCIe Gen3 x4",
      readSpeed: "3400 MB/s",
      writeSpeed: "3000 MB/s",
      endurance: "600 TBW",
      features: ["Dynamic Write Acceleration", "AES 256-bit encryption"]
    }
  },
  { 
    id: 19, 
    name: "Seagate FireCuda 1TB", 
    price: 8800, 
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcST-fgRtm2PbSjivMC1JdCEAfLQrhjddxzfZqQLFxUSs5oDgZ39p0RAhIqigot5P_ebTorDfIS4oodALfjtnJFXPZjAfz1nyU4_QIrfyKs", 
    rating: 4.6, 
    reviews: 100, 
    category: "Storage", 
    brand: "Seagate", 
    details: {
      type: "NVMe SSD",
      interface: "PCIe Gen4 x4",
      readSpeed: "5000 MB/s",
      writeSpeed: "4400 MB/s",
      endurance: "600 TBW",
      features: ["Rescue Data Recovery", "Optimized for gaming"]
    }
  },
  { 
    id: 20, 
    name: "Kingston KC3000 1TB", 
    price: 9200, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTZnp1VGzNUWFZf_bCVyWSFmzdTubQ4Vlbu49lACylvGmjFzp_A0LPHeq3BGGtRAjKp4sD2wEx46Abue72-OMm9-uyZ4R-Q6IjQMB5rMn6u69XaduRXmL-Y", 
    rating: 4.7, 
    reviews: 90, 
    category: "Storage", 
    brand: "Kingston", 
    details: {
      type: "NVMe SSD",
      interface: "PCIe Gen4 x4",
      readSpeed: "7000 MB/s",
      writeSpeed: "6000 MB/s",
      endurance: "800 TBW",
      features: ["Low-profile graphene aluminum heat spreader", "High endurance for heavy workloads"]
    }
  },
  // ====== PSU ======
  { 
    id: 21, 
    name: "Corsair RM750x", 
    price: 9500, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQiDBXwVh-O29I2ra8CTLHVjCRxDloAcWN7KvJpz22Hp6_UEjGtv7Rfg72gjbIC0LFgPq5-NacE5RtCJk9CJ7vE9X1QuEIjp7X2RO_dKeU", 
    rating: 4.8, 
    reviews: 70, 
    category: "PSU", 
    brand: "Corsair", 
    details: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modularity: "Fully Modular",
      fan: "135mm Magnetic Levitation Fan",
      certifications: ["ATX12V v2.4", "EPS12V v2.92"],
      warranty: "10 Years"
    }
  },
  { 
    id: 22, 
    name: "EVGA SuperNOVA 750W", 
    price: 9400, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSY-_mxVLhdbIJ2PZ-rpZPRg96TZpGTkQhS1b17ugqyPueE-IWSElSvPhI-IZL1EjnblpeQJk_L3oUf3fWLoqwzouWothnkEbPjXza8MlOiMAqphiF7xUHk1w", 
    rating: 4.7, 
    reviews: 65, 
    category: "PSU", 
    brand: "EVGA", 
    details: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modularity: "Fully Modular",
      fan: "135mm Fluid Dynamic Bearing Fan",
      certifications: ["NVIDIA SLI Ready", "Intel Haswell Ready"],
      warranty: "10 Years"
    }
  },
  { 
    id: 23, 
    name: "Seasonic Focus 750W", 
    price: 9300, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSmua_l1mii6klWZNdA_tZxUGaDYoHMCTgyJUN0w7v7ALYxkbTlZI1AqXNlhSXfGYXPZgkJ983lWpvY6S4g9oX8wtwhNgLF4ozBPLb-VnxyGiE6YbI0RXkCUeU", 
    rating: 4.7, 
    reviews: 60, 
    category: "PSU", 
    brand: "Seasonic", 
    details: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modularity: "Fully Modular",
      fan: "120mm Fluid Dynamic Bearing Fan",
      certifications: ["Compact Size", "Hybrid Silent Fan Control"],
      warranty: "10 Years"
    }
  },
  { 
    id: 24, 
    name: "Cooler Master MWE 750", 
    price: 9100, 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT6eenSdLB7w1ZmRp_dwUBBhs191q6MmjhWeQA42Id6DUKRQrbMbJAiB1XLoApv7yrtOm0lpsds1ffGX-4aA6Oa8WcuGRWoNPIvMZncXKUDe4_eA473NFi1", 
    rating: 4.6, 
    reviews: 55, 
    category: "PSU", 
    brand: "Cooler Master", 
    details: {
      wattage: "750W",
      efficiency: "80+ Bronze",
      modularity: "Semi-Modular",
      fan: "120mm HDB Fan",
      certifications: ["DC-to-DC Circuit Design", "Flat Black Cables"],
      warranty: "5 Years"
    }
  },
  { 
    id: 25, 
    name: "Be Quiet! Straight Power 750W", 
    price: 9700, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ8xv33uQ7b_3PlIPmilsvIQpfY7uS0I60KvfrIBOURWVYGm1cZGkuxXuHMR02Yo7gJjlukJxuYV4AIrgtnJC5EVbbq2UL13Z3XzWhhYGWolYvlwuGE3dY", 
    rating: 4.8, 
    reviews: 50, 
    category: "PSU", 
    brand: "Be Quiet!", 
    details: {
      wattage: "750W",
      efficiency: "80+ Platinum",
      modularity: "Fully Modular",
      fan: "Silent Wings 3 135mm Fan",
      certifications: ["Virtually Inaudible Operation", "High-End Japanese Capacitors"],
      warranty: "5 Years"
    }
  },

    // ====== Cooler ======
  { 
    id: 26, 
    name: "Cooler Master Hyper 212", 
    price: 4000, 
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT8h05vzqthBP6m7EKGutVXgWoHn7bXUtHLHd9RU3keBc3PCi9dLCSzYb8hjA9WXxdp0nn-tiVfe49H1p6bPgyfGP6BKgGRddqd32bSGR_-Nsfa-lLU1FlCLQ", 
    rating: 4.5, 
    reviews: 70, 
    category: "Cooler", 
    brand: "Cooler Master",
    details: {
      type: "Air",
      compatibility: "Intel LGA1200 / 1700, AMD AM4",
      noiseLevel: "26 dBA",
      fans: "1x 120mm",
      rgb: "No",
      height: "158mm",
      warranty: "2 years"
    }
  },
  { 
    id: 27, 
    name: "Noctua NH-D15", 
    price: 12000, 
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS_QpIbJj64YITBltRGQmBX2HMHjaYVrAPfMcEsGYb7F9db92yZeTVLVm9jdRXOe8B5sNCfeH3i7qQsg4nlSeuJeEReUoSna0QZdu_ZdnrGadP26uBLC_MP", 
    rating: 4.9, 
    reviews: 50, 
    category: "Cooler", 
    brand: "Noctua",
    details: {
      type: "Air",
      compatibility: "Intel LGA1700 / 1200 / 115x, AMD AM5 / AM4",
      noiseLevel: "24.6 dBA",
      fans: "2x 140mm",
      rgb: "No",
      height: "165mm",
      warranty: "6 years"
    }
  },
  { 
    id: 28, 
    name: "Be Quiet! Dark Rock 4", 
    price: 11000, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR60Fo4FHgcpef_ADzosHZHMtqdi14RHPA8kzaEFPDa4NNVR1Cdg8RVqTSZWCYVAazDXkQmVRxmTm8puBMUeLXFIxroymaQ5_mTdTSRlr6Hbjcdk00PJbiC", 
    rating: 4.8, 
    reviews: 55, 
    category: "Cooler", 
    brand: "Be Quiet!",
    details: {
      type: "Air",
      compatibility: "Intel LGA1700 / 1200, AMD AM5 / AM4",
      noiseLevel: "21.4 dBA",
      fans: "1x 135mm Silent Wings",
      rgb: "No",
      height: "159mm",
      warranty: "3 years"
    }
  },
  { 
    id: 29, 
    name: "Corsair iCUE H100i", 
    price: 15000, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRBpkhJKVHZZiZVNEcSvanxAyT02M2BcNU2m16ZUnyy65hKERtfxfTBH-XjzOPmgCXtYyCRX7-jXs8txbgA1HIuTAXrxeSqOttsWzrAvNHSEAa_pLBZf6Ju", 
    rating: 4.7, 
    reviews: 60, 
    category: "Cooler", 
    brand: "Corsair",
    details: {
      type: "Liquid (AIO)",
      compatibility: "Intel LGA1700 / 1200, AMD AM5 / AM4",
      noiseLevel: "25 dBA",
      radiator: "240mm",
      fans: "2x 120mm RGB",
      rgb: "Yes (iCUE)",
      height: "Slim fit",
      warranty: "5 years"
    }
  },
  { 
    id: 30, 
    name: "NZXT Kraken X63", 
    price: 16000, 
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRbKAK2LQx2dfv7cJZdrNRpR2apLS5kffOINo5FL60fxFtwf3JQgRjRwa1yMa8H4YiwdAnI1c7IaoqojwGHGry3UZPywcE4PnY_O1JyWs9LahMM6hSBasX9Mxw", 
    rating: 4.8, 
    reviews: 45, 
    category: "Cooler", 
    brand: "NZXT",
    details: {
      type: "Liquid (AIO)",
      compatibility: "Intel LGA1700 / 1200, AMD AM5 / AM4",
      noiseLevel: "21 dBA",
      radiator: "280mm",
      fans: "2x 140mm Aer RGB 2",
      rgb: "Yes (CAM Software)",
      height: "Slim fit",
      warranty: "6 years"
    }
  },

    // ====== Case ======
  { 
    id: 31, 
    name: "NZXT H510", 
    price: 8000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 90, 
    category: "Case", 
    brand: "NZXT",
    details: {
      formFactor: "ATX, Micro-ATX, Mini-ITX",
      gpuClearance: "381mm",
      cpuCoolerClearance: "165mm",
      radiatorSupport: "Up to 280mm",
      includedFans: "2x 120mm",
      frontPanel: "USB 3.1 Gen1, USB-C, Audio",
      features: "Tempered Glass, Cable Management",
      warranty: "2 years"
    }
  },
  { 
    id: 32, 
    name: "Corsair 4000D", 
    price: 7500, 
    image: "https://via.placeholder.com/200", 
    rating: 4.5, 
    reviews: 85, 
    category: "Case", 
    brand: "Corsair",
    details: {
      formFactor: "ATX, Micro-ATX, Mini-ITX",
      gpuClearance: "360mm",
      cpuCoolerClearance: "170mm",
      radiatorSupport: "360mm Front / 280mm Top",
      includedFans: "2x 120mm AirGuide",
      frontPanel: "USB 3.0, USB-C, Audio",
      features: "High Airflow, Tempered Glass",
      warranty: "2 years"
    }
  },
  { 
    id: 33, 
    name: "Fractal Design Meshify C", 
    price: 7700, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 80, 
    category: "Case", 
    brand: "Fractal Design",
    details: {
      formFactor: "ATX, Micro-ATX, Mini-ITX",
      gpuClearance: "315mm",
      cpuCoolerClearance: "170mm",
      radiatorSupport: "Up to 360mm Front, 240mm Top",
      includedFans: "2x Dynamic X2 GP-12 (120mm)",
      frontPanel: "USB 3.0, Audio",
      features: "High Airflow Mesh, Tempered Glass",
      warranty: "2 years"
    }
  },
  { 
    id: 34, 
    name: "Phanteks P400A", 
    price: 7400, 
    image: "https://via.placeholder.com/200", 
    rating: 4.5, 
    reviews: 75, 
    category: "Case", 
    brand: "Phanteks",
    details: {
      formFactor: "ATX, Micro-ATX, Mini-ITX",
      gpuClearance: "420mm",
      cpuCoolerClearance: "160mm",
      radiatorSupport: "360mm Front, 280mm Top",
      includedFans: "2x 120mm",
      frontPanel: "USB 3.0, Audio",
      features: "ARGB Lighting, Tempered Glass",
      warranty: "3 years"
    }
  },
  { 
    id: 35, 
    name: "Lian Li PC-O11", 
    price: 9000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 70, 
    category: "Case", 
    brand: "Lian Li",
    details: {
      formFactor: "ATX, E-ATX, Micro-ATX, Mini-ITX",
      gpuClearance: "420mm",
      cpuCoolerClearance: "155mm",
      radiatorSupport: "360mm Top, Bottom, Side",
      includedFans: "No fans included",
      frontPanel: "USB 3.0, USB-C, Audio",
      features: "Dual Chamber Design, Tempered Glass",
      warranty: "2 years"
    }
  },

    // ====== Monitor ======
  { 
    id: 36, 
    name: "ASUS TUF 27\" Gaming", 
    price: 18000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.4, 
    reviews: 60, 
    category: "Monitor", 
    brand: "ASUS",
    details: {
      size: "27-inch",
      panel: "IPS",
      resolution: "2560x1440 (QHD)",
      refreshRate: "165Hz",
      responseTime: "1ms",
      adaptiveSync: "FreeSync Premium",
      ports: "2x HDMI 2.0, 1x DisplayPort 1.2",
      brightness: "300 nits, HDR10",
      warranty: "3 years"
    }
  },
  { 
    id: 37, 
    name: "LG UltraGear 27\"", 
    price: 19000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.5, 
    reviews: 55, 
    category: "Monitor", 
    brand: "LG",
    details: {
      size: "27-inch",
      panel: "IPS",
      resolution: "2560x1440 (QHD)",
      refreshRate: "144Hz",
      responseTime: "1ms",
      adaptiveSync: "G-Sync Compatible, FreeSync",
      ports: "2x HDMI, 1x DisplayPort, Headphone Out",
      brightness: "350 nits, HDR10",
      warranty: "3 years"
    }
  },
  { 
    id: 38, 
    name: "Dell Alienware 27\"", 
    price: 20000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 50, 
    category: "Monitor", 
    brand: "Dell",
    details: {
      size: "27-inch",
      panel: "IPS",
      resolution: "2560x1440 (QHD)",
      refreshRate: "240Hz",
      responseTime: "1ms",
      adaptiveSync: "NVIDIA G-Sync Ultimate",
      ports: "2x HDMI, 1x DisplayPort, USB 3.0 Hub",
      brightness: "400 nits, DisplayHDR 600",
      warranty: "3 years"
    }
  },
  { 
    id: 39, 
    name: "Acer Predator 27\"", 
    price: 17500, 
    image: "https://via.placeholder.com/200", 
    rating: 4.4, 
    reviews: 45, 
    category: "Monitor", 
    brand: "Acer",
    details: {
      size: "27-inch",
      panel: "VA",
      resolution: "2560x1440 (QHD)",
      refreshRate: "165Hz",
      responseTime: "2ms",
      adaptiveSync: "FreeSync Premium Pro",
      ports: "2x HDMI 2.0, 1x DisplayPort",
      brightness: "350 nits, HDR400",
      warranty: "2 years"
    }
  },
  { 
    id: 40, 
    name: "Samsung Odyssey G7 27\"", 
    price: 22000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 40, 
    category: "Monitor", 
    brand: "Samsung",
    details: {
      size: "27-inch Curved (1000R)",
      panel: "VA",
      resolution: "2560x1440 (QHD)",
      refreshRate: "240Hz",
      responseTime: "1ms",
      adaptiveSync: "G-Sync & FreeSync Premium Pro",
      ports: "2x HDMI 2.0, 1x DisplayPort, USB Hub",
      brightness: "600 nits, HDR600",
      warranty: "3 years"
    }
  },


    // ====== Gaming Peripherals (10) ======
  { 
    id: 41, 
    name: "Razer DeathAdder V2", 
    price: 6500, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 100, 
    category: "Gaming Peripherals", 
    brand: "Razer",
    details: {
      type: "Gaming Mouse",
      dpi: "20,000 DPI",
      switches: "Razer Optical Switches",
      connectivity: "Wired (USB)",
      buttons: "8 programmable buttons",
      weight: "82g",
      lighting: "Razer Chroma RGB",
      warranty: "2 years"
    }
  },
  { 
    id: 42, 
    name: "Logitech G Pro X Headset", 
    price: 14000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 85, 
    category: "Gaming Peripherals", 
    brand: "Logitech",
    details: {
      type: "Gaming Headset",
      driver: "50mm PRO-G Drivers",
      sound: "DTS Headphone:X 2.0 Surround",
      mic: "Detachable Blue VO!CE mic",
      connectivity: "Wired (USB + 3.5mm)",
      comfort: "Memory foam ear pads",
      weight: "259g",
      warranty: "2 years"
    }
  },
  { 
    id: 43, 
    name: "Corsair K70 Keyboard", 
    price: 12000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.8, 
    reviews: 90, 
    category: "Gaming Peripherals", 
    brand: "Corsair",
    details: {
      type: "Mechanical Keyboard",
      switches: "Cherry MX Red",
      keyRollover: "NKRO, 100% Anti-Ghosting",
      connectivity: "Wired (USB-C)",
      lighting: "Per-Key RGB",
      frame: "Aircraft-grade aluminum",
      extra: "Dedicated media keys, volume roller",
      warranty: "2 years"
    }
  },
  { 
    id: 44, 
    name: "SteelSeries Apex 7", 
    price: 11000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.5, 
    reviews: 70, 
    category: "Gaming Peripherals", 
    brand: "SteelSeries",
    details: {
      type: "Mechanical Keyboard",
      switches: "SteelSeries Red Mechanical",
      keyRollover: "Full N-Key Rollover",
      display: "Smart OLED Display",
      connectivity: "Wired (USB)",
      lighting: "Dynamic RGB",
      frame: "Aircraft-grade aluminum",
      warranty: "2 years"
    }
  },
  { 
    id: 45, 
    name: "HyperX Cloud II", 
    price: 9000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 80, 
    category: "Gaming Peripherals", 
    brand: "HyperX",
    details: {
      type: "Gaming Headset",
      driver: "53mm Neodymium Drivers",
      sound: "Virtual 7.1 Surround",
      mic: "Detachable Noise-Cancelling Mic",
      connectivity: "Wired (USB + 3.5mm)",
      comfort: "Memory foam & leatherette cushions",
      weight: "309g",
      warranty: "2 years"
    }
  },
  { 
    id: 46, 
    name: "Razer BlackWidow V3", 
    price: 12500, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 75, 
    category: "Gaming Peripherals", 
    brand: "Razer",
    details: {
      type: "Mechanical Keyboard",
      switches: "Razer Green Mechanical Switches",
      keyRollover: "Full N-Key Rollover",
      connectivity: "Wired (USB)",
      lighting: "Razer Chroma RGB",
      durability: "80M Keystrokes",
      extra: "Dedicated media keys",
      warranty: "2 years"
    }
  },
  { 
    id: 47, 
    name: "Logitech G502 Mouse", 
    price: 7000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 90, 
    category: "Gaming Peripherals", 
    brand: "Logitech",
    details: {
      type: "Gaming Mouse",
      dpi: "25,600 DPI HERO Sensor",
      switches: "Mechanical Switches",
      connectivity: "Wired (USB)",
      buttons: "11 programmable buttons",
      weight: "Adjustable weights",
      lighting: "LIGHTSYNC RGB",
      warranty: "2 years"
    }
  },
  { 
    id: 48, 
    name: "Elgato Stream Deck", 
    price: 15000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.8, 
    reviews: 50, 
    category: "Gaming Peripherals", 
    brand: "Elgato",
    details: {
      type: "Streaming Accessory",
      keys: "15 Customizable LCD Keys",
      functions: "Hotkeys, Macros, OBS Integration",
      connectivity: "Wired (USB-C)",
      software: "Elgato Stream Deck Software",
      extras: "Custom icons, profiles",
      warranty: "2 years"
    }
  },
  { 
    id: 49, 
    name: "Xbox Elite Controller", 
    price: 13000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 60, 
    category: "Gaming Peripherals", 
    brand: "Xbox",
    details: {
      type: "Game Controller",
      connectivity: "Wired/Wireless (Bluetooth, USB-C)",
      features: "Adjustable thumbsticks, paddles",
      battery: "40-hour rechargeable battery",
      compatibility: "Xbox Series X|S, Xbox One, PC",
      extras: "Carrying case included",
      warranty: "1 year"
    }
  },
  { 
    id: 50, 
    name: "ASUS ROG Strix Mousepad", 
    price: 3000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.5, 
    reviews: 100, 
    category: "Gaming Peripherals", 
    brand: "ASUS",
    details: {
      type: "Gaming Mousepad",
      size: "Extended (900 x 400mm)",
      surface: "Micro-textured cloth",
      edges: "Anti-fray stitched edges",
      base: "Non-slip rubber base",
      lighting: "Aura RGB",
      warranty: "1 year"
    }
  },

  // ====== Motherboards ======
  { 
    id: 51, 
    name: "ASUS ROG Strix Z690-E", 
    price: 35000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 80, 
    category: "Motherboard", 
    brand: "ASUS",
    details: {
      socket: "LGA 1700",
      chipset: "Intel Z690",
      formFactor: "ATX",
      memory: "4x DDR5, up to 6400MHz, 128GB",
      expansion: "3x PCIe 5.0 x16, 1x PCIe 4.0 x1",
      storage: "5x M.2, 6x SATA 6Gb/s",
      networking: "Intel Wi-Fi 6E, 2.5Gb LAN",
      usb: "USB 3.2 Gen2x2 Type-C, USB 3.2 Gen2",
      extras: "Aura Sync RGB, AI Overclocking"
    }
  },
  { 
    id: 52, 
    name: "MSI MPG Z690 Carbon", 
    price: 33000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 70, 
    category: "Motherboard", 
    brand: "MSI",
    details: {
      socket: "LGA 1700",
      chipset: "Intel Z690",
      formFactor: "ATX",
      memory: "4x DDR5, up to 6666MHz, 128GB",
      expansion: "2x PCIe 5.0 x16, 1x PCIe 3.0 x16",
      storage: "5x M.2, 6x SATA 6Gb/s",
      networking: "Intel Wi-Fi 6, 2.5Gb LAN",
      usb: "USB 3.2 Gen2x2, multiple USB 3.2 Gen1",
      extras: "Mystic Light RGB, Frozr heatsink"
    }
  },
  { 
    id: 53, 
    name: "Gigabyte Z690 AORUS Master", 
    price: 34000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.7, 
    reviews: 65, 
    category: "Motherboard", 
    brand: "Gigabyte",
    details: {
      socket: "LGA 1700",
      chipset: "Intel Z690",
      formFactor: "ATX",
      memory: "4x DDR5, up to 6400MHz, 128GB",
      expansion: "1x PCIe 5.0 x16, 2x PCIe 3.0 x16",
      storage: "4x M.2, 6x SATA 6Gb/s",
      networking: "Intel Wi-Fi 6E, 10Gb LAN",
      usb: "USB 3.2 Gen2x2, multiple USB 3.2 Gen2",
      extras: "RGB Fusion, Thermal Guard III"
    }
  },
  { 
    id: 54, 
    name: "ASRock Z690 Taichi", 
    price: 32000, 
    image: "https://via.placeholder.com/200", 
    rating: 4.6, 
    reviews: 60, 
    category: "Motherboard", 
    brand: "ASRock",
    details: {
      socket: "LGA 1700",
      chipset: "Intel Z690",
      formFactor: "ATX",
      memory: "4x DDR5, up to 6400MHz, 128GB",
      expansion: "2x PCIe 5.0 x16, 1x PCIe 3.0 x16",
      storage: "5x M.2, 8x SATA 6Gb/s",
      networking: "Killer Wi-Fi 6E, 2.5Gb LAN",
      usb: "USB 3.2 Gen2x2 Type-C, Thunderbolt 4",
      extras: "Polychrome RGB, Reinforced PCIe slots"
    }
  },
  { 
    id: 55, 
    name: "EVGA Z690 FTW", 
    price: 34500, 
    image: "https://via.placeholder.com/200", 
    rating: 4.8, 
    reviews: 50, 
    category: "Motherboard", 
    brand: "EVGA",
    details: {
      socket: "LGA 1700",
      chipset: "Intel Z690",
      formFactor: "E-ATX",
      memory: "4x DDR5, up to 6400MHz, 128GB",
      expansion: "2x PCIe 5.0 x16, 1x PCIe 4.0 x16",
      storage: "4x M.2, 6x SATA 6Gb/s",
      networking: "Killer Wi-Fi 6E, Dual 2.5Gb LAN",
      usb: "USB 3.2 Gen2x2, multiple USB 3.2 Gen2",
      extras: "ARGB lighting, Solid VRM heatsinks"
    }
  }
];

export default productsData;
