// The moving logo wall on the home page.
//
// Fanout's wall shows where its learners come from. Before launch we have no learners, so
// claiming colleges or companies here would be false advertising. Until real data exists the
// wall shows companies decoded in the Real Stories and tracks. Once learners sign up, switch
// MARQUEE_HEADING to "Shared around the world" and replace the rows with their institutions.

export type MarqueeStyle = "plain" | "serif" | "bold" | "mono" | "italic" | "caps";

export type MarqueeItem = { name: string; style: MarqueeStyle; mark?: string; color?: string };

export const MARQUEE_HEADING = "Decoded inside the tracks";

export const MARQUEE_ROWS: { duration: string; reverse?: boolean; items: MarqueeItem[] }[] = [
  {
    duration: "96s",
    items: [
      { name: "Zomato", style: "bold", color: "#E23744" },
      { name: "Amul", style: "plain", mark: "A", color: "#1F5FAD" },
      { name: "Zerodha", style: "plain", mark: "Z", color: "#387ED1" },
      { name: "TATA", style: "caps", color: "#2D4E8A" },
      { name: "Rolex", style: "serif", color: "#0B6B3A" },
      { name: "Nykaa", style: "italic", color: "#E8336D" },
      { name: "boAt", style: "bold" },
      { name: "zoho", style: "mono", color: "#D9302C" },
      { name: "Lenskart", style: "plain", mark: "L", color: "#11A5B0" },
      { name: "Paper Boat", style: "serif" },
      { name: "Haldiram's", style: "plain", mark: "H", color: "#C8102E" },
      { name: "The Leela", style: "serif", color: "#7A5C2E" },
      { name: "Titan", style: "caps" },
    ],
  },
  {
    duration: "108s",
    reverse: true,
    items: [
      { name: "Apple", style: "plain", mark: "A", color: "#272727" },
      { name: "TOYOTA", style: "caps", color: "#C8102E" },
      { name: "IKEA", style: "bold", color: "#0058A3" },
      { name: "Nike", style: "italic" },
      { name: "Red Bull", style: "bold", color: "#D20515" },
      { name: "Airbnb", style: "plain", mark: "a", color: "#FF5A5F" },
      { name: "amazon", style: "bold" },
      { name: "Juicero", style: "mono" },
      { name: "Starbucks", style: "serif", color: "#00704A" },
      { name: "Dollar Shave Club", style: "plain", mark: "D", color: "#3B4252" },
      { name: "Hermès", style: "serif" },
      { name: "SpaceX", style: "caps" },
      { name: "Quibi", style: "serif", color: "#6E56CF" },
    ],
  },
  {
    duration: "88s",
    items: [
      { name: "Jio", style: "bold", color: "#0F3CC9" },
      { name: "Mamaearth", style: "plain", mark: "M", color: "#2AB673" },
      { name: "CRED", style: "caps" },
      { name: "Razorpay", style: "italic", color: "#2F7CF6" },
      { name: "Freshworks", style: "plain", mark: "F", color: "#25C16F" },
      { name: "PhysicsWallah", style: "bold" },
      { name: "meesho", style: "bold", color: "#9F2089" },
      { name: "Pidilite", style: "plain", mark: "P", color: "#E4402C" },
      { name: "Asian Paints", style: "serif" },
      { name: "IndiaMART", style: "plain", mark: "I", color: "#2E3192" },
      { name: "Eureka Forbes", style: "plain", mark: "E", color: "#0072BC" },
      { name: "Country Delight", style: "italic", color: "#2AB673" },
      { name: "Bombay Shaving Co", style: "mono" },
    ],
  },
];
