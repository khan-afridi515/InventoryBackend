// Flat 3-month sales dataset, read by generateReport.repository.js.
// One object per product sold on a given day (92 days x up to 5
// products = 460 records) - each object carries every field the
// frontend table needs directly, with no nesting:
//   product, qtySold, unitPurchase, unitSelling, totalCost,
//   totalRevenue, profitLoss, date
//
// Kept in sync with the frontend mock at
// shared/data/mockSalesRecords.js so numbers match while both
// exist side by side.

const reportData = [
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 14,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 58.8,
    "totalRevenue": 181.86,
    "profitLoss": 123.06,
    "date": "2026-04-15"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-04-15"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-04-15"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-04-15"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-15"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-04-16"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-04-16"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-04-16"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-16"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-04-16"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-04-17"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-04-17"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-04-17"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-04-17"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-17"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-04-18"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-04-18"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-04-18"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-04-18"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-18"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-04-19"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-04-19"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-04-19"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-04-19"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-04-19"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 10,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 42,
    "totalRevenue": 129.9,
    "profitLoss": 87.9,
    "date": "2026-04-20"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-04-20"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-04-20"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-20"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-04-20"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-04-21"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-04-21"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 5,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 30,
    "totalRevenue": 84.95,
    "profitLoss": 54.95,
    "date": "2026-04-21"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-04-21"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-21"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-04-22"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-04-22"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 6,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 36,
    "totalRevenue": 101.94,
    "profitLoss": 65.94,
    "date": "2026-04-22"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-04-22"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-04-22"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-04-23"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-04-23"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-04-23"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-04-23"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-04-23"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-04-24"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 3,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 25.5,
    "totalRevenue": 59.97,
    "profitLoss": 34.47,
    "date": "2026-04-24"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-04-24"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-04-24"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-24"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 10,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 42,
    "totalRevenue": 129.9,
    "profitLoss": 87.9,
    "date": "2026-04-25"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-04-25"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-04-25"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-04-25"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-04-25"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 14,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 58.8,
    "totalRevenue": 181.86,
    "profitLoss": 123.06,
    "date": "2026-04-26"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-04-26"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-04-26"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-26"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-04-26"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-04-27"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-04-27"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-04-27"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-27"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-04-27"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-04-28"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-04-28"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-04-28"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-28"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-04-28"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-04-29"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-04-29"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-04-29"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-29"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-04-29"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 8,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 33.6,
    "totalRevenue": 103.92,
    "profitLoss": 70.32,
    "date": "2026-04-30"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-04-30"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-04-30"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-04-30"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-04-30"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-05-01"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-01"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-05-01"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-01"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-01"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 10,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 42,
    "totalRevenue": 129.9,
    "profitLoss": 87.9,
    "date": "2026-05-02"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-02"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-02"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-05-02"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-02"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 18,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 75.6,
    "totalRevenue": 233.82,
    "profitLoss": 158.22,
    "date": "2026-05-03"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-05-03"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-03"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-03"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-03"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-05-04"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-04"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-04"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-04"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-04"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-05-05"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-05-05"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-05-05"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-05"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-05"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 18,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 75.6,
    "totalRevenue": 233.82,
    "profitLoss": 158.22,
    "date": "2026-05-06"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-06"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 6,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 36,
    "totalRevenue": 101.94,
    "profitLoss": 65.94,
    "date": "2026-05-06"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-05-06"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-06"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 8,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 33.6,
    "totalRevenue": 103.92,
    "profitLoss": 70.32,
    "date": "2026-05-07"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-07"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-05-07"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-05-07"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-07"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-05-08"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-05-08"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-08"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-08"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-08"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-05-09"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-05-09"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-05-09"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-05-09"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-09"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-05-10"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-05-10"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 14,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 84,
    "totalRevenue": 237.86,
    "profitLoss": 153.86,
    "date": "2026-05-10"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-10"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-10"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-05-11"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-05-11"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-11"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-11"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-11"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-05-12"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-12"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-05-12"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-12"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-12"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-05-13"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-13"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-05-13"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-13"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-13"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 10,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 42,
    "totalRevenue": 129.9,
    "profitLoss": 87.9,
    "date": "2026-05-14"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-14"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-14"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-14"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-14"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 14,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 58.8,
    "totalRevenue": 181.86,
    "profitLoss": 123.06,
    "date": "2026-05-15"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-15"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-05-15"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-15"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-15"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-05-16"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-05-16"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-16"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-16"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-16"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-05-17"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-05-17"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-05-17"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-17"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-17"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-05-18"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-05-18"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-18"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-18"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-18"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-05-19"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-05-19"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-19"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-19"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-05-19"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-05-20"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-20"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-05-20"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-20"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-20"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-05-21"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-21"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 5,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 30,
    "totalRevenue": 84.95,
    "profitLoss": 54.95,
    "date": "2026-05-21"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-21"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-21"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-05-22"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-05-22"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-05-22"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-05-22"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-22"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 21,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 88.2,
    "totalRevenue": 272.79,
    "profitLoss": 184.59,
    "date": "2026-05-23"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-05-23"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-23"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 8,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 76,
    "totalRevenue": 199.92,
    "profitLoss": 123.92,
    "date": "2026-05-23"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-05-23"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-05-24"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-05-24"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 15,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 90,
    "totalRevenue": 254.85,
    "profitLoss": 164.85,
    "date": "2026-05-24"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-05-24"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-24"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-05-25"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-25"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-05-25"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-25"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-05-25"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-05-26"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-05-26"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-05-26"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-05-26"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-26"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-05-27"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-27"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-27"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-05-27"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-27"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-05-28"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-05-28"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-05-28"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-28"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-05-28"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-05-29"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-05-29"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-05-29"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-29"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-05-29"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-05-30"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-05-30"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 14,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 84,
    "totalRevenue": 237.86,
    "profitLoss": 153.86,
    "date": "2026-05-30"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-05-30"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 6,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 66,
    "totalRevenue": 179.94,
    "profitLoss": 113.94,
    "date": "2026-05-30"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 23,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 96.6,
    "totalRevenue": 298.77,
    "profitLoss": 202.17,
    "date": "2026-05-31"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-05-31"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-05-31"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-05-31"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-05-31"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 18,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 75.6,
    "totalRevenue": 233.82,
    "profitLoss": 158.22,
    "date": "2026-06-01"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-01"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-06-01"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-01"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-06-01"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-06-02"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-02"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-06-02"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-02"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-02"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 18,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 75.6,
    "totalRevenue": 233.82,
    "profitLoss": 158.22,
    "date": "2026-06-03"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-03"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-06-03"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-03"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-06-03"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-06-04"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-04"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-06-04"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-04"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-04"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-06-05"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-05"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 6,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 36,
    "totalRevenue": 101.94,
    "profitLoss": 65.94,
    "date": "2026-06-05"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-05"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-05"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 22,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 92.4,
    "totalRevenue": 285.78,
    "profitLoss": 193.38,
    "date": "2026-06-06"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-06"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-06-06"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-06-06"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-06"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-06-07"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-07"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-06-07"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-07"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-07"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-06-08"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-08"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-06-08"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-06-08"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 2,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 22,
    "totalRevenue": 59.98,
    "profitLoss": 37.98,
    "date": "2026-06-08"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-06-09"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-06-09"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-06-09"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-09"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-09"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-06-10"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-06-10"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-06-10"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-10"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-10"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-06-11"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-11"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-06-11"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-11"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-06-11"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-06-12"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-12"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-06-12"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-12"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-12"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 23,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 96.6,
    "totalRevenue": 298.77,
    "profitLoss": 202.17,
    "date": "2026-06-13"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 10,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 85,
    "totalRevenue": 199.9,
    "profitLoss": 114.9,
    "date": "2026-06-13"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-06-13"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-13"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-13"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-06-14"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-06-14"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-06-14"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-14"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-14"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-06-15"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-15"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-06-15"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-15"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-15"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-06-16"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-06-16"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-06-16"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-06-16"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-16"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-06-17"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-17"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-06-17"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-17"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-17"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 14,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 58.8,
    "totalRevenue": 181.86,
    "profitLoss": 123.06,
    "date": "2026-06-18"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-18"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-06-18"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-18"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-18"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-06-19"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-19"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-06-19"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-06-19"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-19"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 23,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 96.6,
    "totalRevenue": 298.77,
    "profitLoss": 202.17,
    "date": "2026-06-20"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 10,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 85,
    "totalRevenue": 199.9,
    "profitLoss": 114.9,
    "date": "2026-06-20"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 16,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 96,
    "totalRevenue": 271.84,
    "profitLoss": 175.84,
    "date": "2026-06-20"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-06-20"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 6,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 66,
    "totalRevenue": 179.94,
    "profitLoss": 113.94,
    "date": "2026-06-20"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 22,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 92.4,
    "totalRevenue": 285.78,
    "profitLoss": 193.38,
    "date": "2026-06-21"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-21"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 17,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 102,
    "totalRevenue": 288.83,
    "profitLoss": 186.83,
    "date": "2026-06-21"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-21"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-06-21"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 20,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 84,
    "totalRevenue": 259.8,
    "profitLoss": 175.8,
    "date": "2026-06-22"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-06-22"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 6,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 36,
    "totalRevenue": 101.94,
    "profitLoss": 65.94,
    "date": "2026-06-22"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-06-22"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-22"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-06-23"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-23"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-06-23"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-06-23"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-23"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-06-24"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-24"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-06-24"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-24"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-24"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-06-25"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-06-25"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 10,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 60,
    "totalRevenue": 169.9,
    "profitLoss": 109.9,
    "date": "2026-06-25"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-25"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-06-25"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-06-26"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 5,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 42.5,
    "totalRevenue": 99.95,
    "profitLoss": 57.45,
    "date": "2026-06-26"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-06-26"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-06-26"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-06-26"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 24,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 100.8,
    "totalRevenue": 311.76,
    "profitLoss": 210.96,
    "date": "2026-06-27"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-06-27"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 15,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 90,
    "totalRevenue": 254.85,
    "profitLoss": 164.85,
    "date": "2026-06-27"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-27"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-06-27"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 21,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 88.2,
    "totalRevenue": 272.79,
    "profitLoss": 184.59,
    "date": "2026-06-28"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-28"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-06-28"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-28"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 6,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 66,
    "totalRevenue": 179.94,
    "profitLoss": 113.94,
    "date": "2026-06-28"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 14,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 58.8,
    "totalRevenue": 181.86,
    "profitLoss": 123.06,
    "date": "2026-06-29"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-06-29"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-06-29"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-06-29"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-06-29"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 11,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 46.2,
    "totalRevenue": 142.89,
    "profitLoss": 96.69,
    "date": "2026-06-30"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-06-30"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-06-30"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 3,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 28.5,
    "totalRevenue": 74.97,
    "profitLoss": 46.47,
    "date": "2026-06-30"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-06-30"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-07-01"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-07-01"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-07-01"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-07-01"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-07-01"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-07-02"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-07-02"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-07-02"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-07-02"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-07-02"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 9,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 37.8,
    "totalRevenue": 116.91,
    "profitLoss": 79.11,
    "date": "2026-07-03"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-07-03"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-07-03"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-07-03"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-07-03"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 26,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 109.2,
    "totalRevenue": 337.74,
    "profitLoss": 228.54,
    "date": "2026-07-04"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 10,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 85,
    "totalRevenue": 199.9,
    "profitLoss": 114.9,
    "date": "2026-07-04"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-07-04"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 8,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 76,
    "totalRevenue": 199.92,
    "profitLoss": 123.92,
    "date": "2026-07-04"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-07-04"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 16,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 67.2,
    "totalRevenue": 207.84,
    "profitLoss": 140.64,
    "date": "2026-07-05"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-07-05"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 14,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 84,
    "totalRevenue": 237.86,
    "profitLoss": 153.86,
    "date": "2026-07-05"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 9,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 85.5,
    "totalRevenue": 224.91,
    "profitLoss": 139.41,
    "date": "2026-07-05"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 6,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 66,
    "totalRevenue": 179.94,
    "profitLoss": 113.94,
    "date": "2026-07-05"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 15,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 63,
    "totalRevenue": 194.85,
    "profitLoss": 131.85,
    "date": "2026-07-06"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-07-06"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 8,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 48,
    "totalRevenue": 135.92,
    "profitLoss": 87.92,
    "date": "2026-07-06"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-07-06"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-06"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-07-07"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 4,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 34,
    "totalRevenue": 79.96,
    "profitLoss": 45.96,
    "date": "2026-07-07"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 12,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 72,
    "totalRevenue": 203.88,
    "profitLoss": 131.88,
    "date": "2026-07-07"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-07-07"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-07-07"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 20,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 84,
    "totalRevenue": 259.8,
    "profitLoss": 175.8,
    "date": "2026-07-08"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 7,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 59.5,
    "totalRevenue": 139.93,
    "profitLoss": 80.43,
    "date": "2026-07-08"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-07-08"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 6,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 57,
    "totalRevenue": 149.94,
    "profitLoss": 92.94,
    "date": "2026-07-08"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-08"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 19,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 79.8,
    "totalRevenue": 246.81,
    "profitLoss": 167.01,
    "date": "2026-07-09"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-07-09"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 9,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 54,
    "totalRevenue": 152.91,
    "profitLoss": 98.91,
    "date": "2026-07-09"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-07-09"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-09"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 18,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 75.6,
    "totalRevenue": 233.82,
    "profitLoss": 158.22,
    "date": "2026-07-10"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-07-10"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-07-10"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-07-10"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-10"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 25,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 105,
    "totalRevenue": 324.75,
    "profitLoss": 219.75,
    "date": "2026-07-11"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-07-11"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 16,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 96,
    "totalRevenue": 271.84,
    "profitLoss": 175.84,
    "date": "2026-07-11"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-07-11"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-07-11"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 12,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 50.4,
    "totalRevenue": 155.88,
    "profitLoss": 105.48,
    "date": "2026-07-12"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 8,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 68,
    "totalRevenue": 159.92,
    "profitLoss": 91.92,
    "date": "2026-07-12"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-07-12"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 8,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 76,
    "totalRevenue": 199.92,
    "profitLoss": 123.92,
    "date": "2026-07-12"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 5,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 55,
    "totalRevenue": 149.95,
    "profitLoss": 94.95,
    "date": "2026-07-12"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 17,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 71.4,
    "totalRevenue": 220.83,
    "profitLoss": 149.43,
    "date": "2026-07-13"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-07-13"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 11,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 66,
    "totalRevenue": 186.89,
    "profitLoss": 120.89,
    "date": "2026-07-13"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 7,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 66.5,
    "totalRevenue": 174.93,
    "profitLoss": 108.43,
    "date": "2026-07-13"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-13"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 13,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 54.6,
    "totalRevenue": 168.87,
    "profitLoss": 114.27,
    "date": "2026-07-14"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 6,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 51,
    "totalRevenue": 119.94,
    "profitLoss": 68.94,
    "date": "2026-07-14"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 13,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 78,
    "totalRevenue": 220.87,
    "profitLoss": 142.87,
    "date": "2026-07-14"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 5,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 47.5,
    "totalRevenue": 124.95,
    "profitLoss": 77.45,
    "date": "2026-07-14"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 3,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 33,
    "totalRevenue": 89.97,
    "profitLoss": 56.97,
    "date": "2026-07-14"
  },
  {
    "product": "Cotton Crew T-Shirt",
    "qtySold": 20,
    "unitPurchase": 4.2,
    "unitSelling": 12.99,
    "totalCost": 84,
    "totalRevenue": 259.8,
    "profitLoss": 175.8,
    "date": "2026-07-15"
  },
  {
    "product": "Wireless Mouse MX2",
    "qtySold": 9,
    "unitPurchase": 8.5,
    "unitSelling": 19.99,
    "totalCost": 76.5,
    "totalRevenue": 179.91,
    "profitLoss": 103.41,
    "date": "2026-07-15"
  },
  {
    "product": "Ceramic Coffee Mug Set",
    "qtySold": 7,
    "unitPurchase": 6,
    "unitSelling": 16.99,
    "totalCost": 42,
    "totalRevenue": 118.93,
    "profitLoss": 76.93,
    "date": "2026-07-15"
  },
  {
    "product": "Yoga Mat Premium",
    "qtySold": 4,
    "unitPurchase": 9.5,
    "unitSelling": 24.99,
    "totalCost": 38,
    "totalRevenue": 99.96,
    "profitLoss": 61.96,
    "date": "2026-07-15"
  },
  {
    "product": "Hydrating Face Serum",
    "qtySold": 4,
    "unitPurchase": 11,
    "unitSelling": 29.99,
    "totalCost": 44,
    "totalRevenue": 119.96,
    "profitLoss": 75.96,
    "date": "2026-07-15"
  }
];

//export
export { reportData };