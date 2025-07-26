// Select the database to use.
use("MarketSimplified");

// =============================================================================
// FAKE INFLUENCER DATA GENERATOR SCRIPT
// =============================================================================
// Run this script to create realistic influencer test accounts
// Use Ctrl+Shift+P or Cmd+Shift+P to open command palette and run selected code

// CLEAR EXISTING TEST DATA (uncomment to reset)
// db.users.deleteMany({ email: { $regex: /@testinfluencer\.com$/ } });

// Generate fake influencer accounts with updated schema fields
const influencers = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Fashion & lifestyle content creator passionate about sustainable living. Sharing my journey of mindful choices and timeless style.",
      niche: ["Fashion", "Lifestyle", "Sustainability"],
      totalFollowers: 255000, // Instagram (125k) + TikTok (85k) + YouTube (45k)
      jobsCompleted: 12,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@sarahjstyle",
          followerCount: 125000
        },
        {
          platform: "TikTok",
          username: "@sarahjstyle",
          followerCount: 85000
        },
        {
          platform: "YouTube",
          username: "Sarah Johnson",
          followerCount: 45000
        }
      ],
      earnings: {
        totalEarned: 18000,
        availableBalance: 2500,
        pendingPayments: 1500,
        paymentHistory: [
          {
            amount: 1500,
            date: new Date("2024-12-15"),
            status: "paid"
          },
          {
            amount: 2200,
            date: new Date("2024-11-20"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [
        {
          status: "pending",
          invitedAt: new Date("2025-01-10"),
          respondedAt: null
        }
      ],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Fitness coach and nutrition expert helping people transform their lives through health and wellness. Your journey starts here! 💪",
      niche: ["Fitness", "Health", "Nutrition"],
      totalFollowers: 425000, // Instagram (200k) + TikTok (150k) + YouTube (75k)
      jobsCompleted: 18,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@marcusfitness",
          followerCount: 200000
        },
        {
          platform: "TikTok",
          username: "@marcusfitness",
          followerCount: 150000
        },
        {
          platform: "YouTube",
          username: "Marcus Fitness",
          followerCount: 75000
        }
      ],
      earnings: {
        totalEarned: 32000,
        availableBalance: 4200,
        pendingPayments: 2800,
        paymentHistory: [
          {
            amount: 2200,
            date: new Date("2024-12-18"),
            status: "paid"
          },
          {
            amount: 1800,
            date: new Date("2024-12-05"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Emma Chen",
    email: "emma.chen@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Tech enthusiast & software engineer sharing coding tutorials, product reviews, and career advice for aspiring developers.",
      niche: ["Technology", "Education", "Career"],
      totalFollowers: 295000, // Instagram (80k) + TikTok (120k) + YouTube (95k)
      jobsCompleted: 8,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@emmacodes",
          followerCount: 80000
        },
        {
          platform: "TikTok",
          username: "@emmacodes",
          followerCount: 120000
        },
        {
          platform: "YouTube",
          username: "Emma Codes",
          followerCount: 95000
        }
      ],
      earnings: {
        totalEarned: 14500,
        availableBalance: 1800,
        pendingPayments: 1500,
        paymentHistory: [
          {
            amount: 1800,
            date: new Date("2024-12-10"),
            status: "paid"
          },
          {
            amount: 1500,
            date: new Date("2024-11-25"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [
        {
          status: "accepted",
          invitedAt: new Date("2024-12-20"),
          respondedAt: new Date("2024-12-21")
        }
      ],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "David Kim",
    email: "david.kim@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Food blogger and chef exploring global cuisines. Join me on culinary adventures around the world! 🍜✈️",
      niche: ["Food", "Travel", "Culture"],
      totalFollowers: 460000, // Instagram (175k) + TikTok (220k) + YouTube (65k)
      jobsCompleted: 15,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@davidcooks",
          followerCount: 175000
        },
        {
          platform: "TikTok",
          username: "@davidcooks",
          followerCount: 220000
        },
        {
          platform: "YouTube",
          username: "David Cooks",
          followerCount: 65000
        }
      ],
      earnings: {
        totalEarned: 28000,
        availableBalance: 3200,
        pendingPayments: 2000,
        paymentHistory: [
          {
            amount: 2000,
            date: new Date("2024-12-22"),
            status: "paid"
          },
          {
            amount: 2500,
            date: new Date("2024-12-01"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [
        {
          status: "pending",
          invitedAt: new Date("2025-01-05"),
          respondedAt: null
        }
      ],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Luna Martinez",
    email: "luna.martinez@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Beauty guru and makeup artist sharing tutorials, product reviews, and self-confidence tips. Beauty is for everyone! ✨",
      niche: ["Beauty", "Makeup", "Self-Care"],
      totalFollowers: 565000, // Instagram (300k) + TikTok (180k) + YouTube (85k)
      jobsCompleted: 22,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@lunabeauty",
          followerCount: 300000
        },
        {
          platform: "TikTok",
          username: "@lunabeauty",
          followerCount: 180000
        },
        {
          platform: "YouTube",
          username: "Luna Beauty",
          followerCount: 85000
        }
      ],
      earnings: {
        totalEarned: 45000,
        availableBalance: 5200,
        pendingPayments: 2800,
        paymentHistory: [
          {
            amount: 2800,
            date: new Date("2024-12-28"),
            status: "paid"
          },
          {
            amount: 2200,
            date: new Date("2024-12-15"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [
        {
          status: "accepted",
          invitedAt: new Date("2024-12-25"),
          respondedAt: new Date("2024-12-26")
        }
      ],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Alex Thompson",
    email: "alex.thompson@testinfluencer.com",
    profileImageURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    userType: "influencer",
    isProfileComplete: true,
    influencer: {
      bio: "Adventure photographer and travel vlogger capturing the world's most breathtaking destinations. Let's explore together! 🌍📸",
      niche: ["Travel", "Photography", "Adventure"],
      totalFollowers: 455000, // Instagram (240k) + TikTok (95k) + YouTube (120k)
      jobsCompleted: 10,
      socialMediaAccounts: [
        {
          platform: "Instagram",
          username: "@alexadventures",
          followerCount: 240000
        },
        {
          platform: "TikTok",
          username: "@alexadventures",
          followerCount: 95000
        },
        {
          platform: "YouTube",
          username: "Alex Adventures",
          followerCount: 120000
        }
      ],
      earnings: {
        totalEarned: 22000,
        availableBalance: 2800,
        pendingPayments: 1800,
        paymentHistory: [
          {
            amount: 2500,
            date: new Date("2024-12-12"),
            status: "paid"
          },
          {
            amount: 1800,
            date: new Date("2024-11-30"),
            status: "paid"
          }
        ]
      },
      campaignInvitations: [
        {
          status: "declined",
          invitedAt: new Date("2024-12-18"),
          respondedAt: new Date("2024-12-19")
        }
      ],
      participatedCampaigns: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Insert the test data
db.users.insertMany(influencers);