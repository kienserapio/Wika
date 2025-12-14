import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");
    
    // Clean up existing data
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    // 1. Insert Courses
    await db.insert(schema.courses).values([
      { id: 1, title: "Filipino", imageSrc: "/flags/ph.png" },
      { id: 2, title: "Cebuano", imageSrc: "/flags/cebu.jpg" },
      { id: 3, title: "Ilocano", imageSrc: "/flags/ilocano.png" },
      { id: 4, title: "Pangasinan", imageSrc: "/flags/pangasinan.png" },
      { id: 5, title: "Hiligaynon", imageSrc: "/flags/iloilo.png" },
      { id: 6, title: "Baybayin", imageSrc: "/flags/baybayin.png" },
    ]);

    // 2. Insert Units
    await db.insert(schema.units).values([
      // --- Filipino Units ---
      { id: 1, courseId: 1, title: "Unit 1", description: "The Basics (Mga Batayan)", order: 1 },
      { id: 2, courseId: 1, title: "Unit 2", description: "Common Phrases (Mga Karaniwang Parirala)", order: 2 },
      // --- Cebuano Units ---
      { id: 3, courseId: 2, title: "Unit 1", description: "The Basics (Mga Sukaranan)", order: 1 },
      { id: 4, courseId: 2, title: "Unit 2", description: "Common Phrases (Mga Kasagarang Pulong)", order: 2 },
      // --- Hiligaynon Unit 1 ---
      { id: 5, courseId: 5, title: "Unit 1", description: "Basic Ilonggo Words (Mga Pulong)", order: 1 },
      // --- Ilocano Unit 1 ---
      { id: 6, courseId: 3, title: "Unit 1", description: "Basic Ilokano Words (Dagiti Balikas)", order: 1 },
      // --- Pangasinan Unit 1 ---
      { id: 7, courseId: 4, title: "Unit 1", description: "Basic Pangasinan Words (Saray Salita)", order: 1 },
      // --- Baybayin Unit 1 (New) ---
      { id: 8, courseId: 6, title: "Unit 1", description: "The Core Syllabary (Ang Pangunahing Silabaryo)", order: 1 },
    ]);

    // 3. Insert Lessons
    await db.insert(schema.lessons).values([
      // --- Filipino Unit 1 (1-5) & Unit 2 (6-10) ---
      { id: 1, unitId: 1, order: 1, title: "Family Members" },
      { id: 2, unitId: 1, order: 2, title: "Basic Actions" },
      { id: 3, unitId: 1, order: 3, title: "Describing Things" },
      { id: 4, unitId: 1, order: 4, title: "Food & Drink" },
      { id: 5, unitId: 1, order: 5, title: "Greetings" },
      { id: 6, unitId: 2, order: 1, title: "Greetings & Time" },
      { id: 7, unitId: 2, order: 2, title: "Introductions" },
      { id: 8, unitId: 2, order: 3, title: "Wants & Likes" },
      { id: 9, unitId: 2, order: 4, title: "Emotions" },
      { id: 10, unitId: 2, order: 5, title: "Politeness" },
      // --- Cebuano Unit 1 (11-15) & Unit 2 (16-20) ---
      { id: 11, unitId: 3, order: 1, title: "Family Members" },
      { id: 12, unitId: 3, order: 2, title: "Basic Actions" },
      { id: 13, unitId: 3, order: 3, title: "Describing Things" },
      { id: 14, unitId: 3, order: 4, title: "Food & Drink" },
      { id: 15, unitId: 3, order: 5, title: "Greetings" },
      { id: 16, unitId: 4, order: 1, title: "Greetings & Time" },
      { id: 17, unitId: 4, order: 2, title: "Introductions" },
      { id: 18, unitId: 4, order: 3, title: "Wants & Likes" },
      { id: 19, unitId: 4, order: 4, title: "Emotions" },
      { id: 20, unitId: 4, order: 5, title: "Politeness" },
      // --- Hiligaynon Unit 1 (21-25) ---
      { id: 21, unitId: 5, order: 1, title: "Family Members" },
      { id: 22, unitId: 5, order: 2, title: "Basic Actions" },
      { id: 23, unitId: 5, order: 3, title: "Describing Things" },
      { id: 24, unitId: 5, order: 4, title: "Food & Drink" },
      { id: 25, unitId: 5, order: 5, title: "Greetings" },
      // --- Ilocano Unit 1 (26-30) ---
      { id: 26, unitId: 6, order: 1, title: "Family Members" },
      { id: 27, unitId: 6, order: 2, title: "Basic Actions" },
      { id: 28, unitId: 6, order: 3, title: "Describing Things" },
      { id: 29, unitId: 6, order: 4, title: "Food & Drink" },
      { id: 30, unitId: 6, order: 5, title: "Greetings" },
      // --- Pangasinan Unit 1 (31-35) ---
      { id: 31, unitId: 7, order: 1, title: "Family Members" },
      { id: 32, unitId: 7, order: 2, title: "Basic Actions" },
      { id: 33, unitId: 7, order: 3, title: "Describing Things" },
      { id: 34, unitId: 7, order: 4, title: "Food & Drink" },
      { id: 35, unitId: 7, order: 5, title: "Greetings" },
      // --- Baybayin Unit 1 (36-40) ---
      { id: 36, unitId: 8, order: 1, title: "The Vowels" },
      { id: 37, unitId: 8, order: 2, title: "The Base B-Syllables" },
      { id: 38, unitId: 8, order: 3, title: "The Base D/L-Syllables" },
      { id: 39, unitId: 8, order: 4, title: "The Base G-Syllables" },
      { id: 40, unitId: 8, order: 5, title: "Final Consonants" },
    ]);

    // 4. Insert Challenges
    await db.insert(schema.challenges).values([
      // ============================================
      // FILIPINO CHALLENGES (1-50) - Existing content
      // ============================================
      { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'How do you say "Father"?' }, { id: 2, lessonId: 1, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' }, { id: 4, lessonId: 1, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 5, lessonId: 1, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' }, { id: 6, lessonId: 2, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 7, lessonId: 2, type: "SELECT", order: 2, question: 'How do you say "To drink"?' }, { id: 8, lessonId: 2, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 9, lessonId: 2, type: "SELECT", order: 4, question: 'How do you say "To walk"?' }, { id: 10, lessonId: 2, type: "SELECT", order: 5, question: 'How do you say "To read"?' },
      { id: 11, lessonId: 3, type: "SELECT", order: 1, question: 'How do you say "Beautiful"?' }, { id: 12, lessonId: 3, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 13, lessonId: 3, type: "SELECT", order: 3, question: 'How do you say "Happy"?' }, { id: 14, lessonId: 3, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 15, lessonId: 3, type: "SELECT", order: 5, question: 'How do you say "Hot"?' }, { id: 16, lessonId: 4, type: "SELECT", order: 1, question: 'How do you say "Rice"?' },
      { id: 17, lessonId: 4, type: "SELECT", order: 2, question: 'How do you say "Water"?' }, { id: 18, lessonId: 4, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 19, lessonId: 4, type: "SELECT", order: 4, question: 'How do you say "Fish"?' }, { id: 20, lessonId: 4, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },
      { id: 21, lessonId: 5, type: "SELECT", order: 1, question: 'How do you say "Yes"?' }, { id: 22, lessonId: 5, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 23, lessonId: 5, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' }, { id: 24, lessonId: 5, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 25, lessonId: 5, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' }, { id: 26, lessonId: 6, type: "SELECT", order: 1, question: 'How do you say "Good afternoon"?' },
      { id: 27, lessonId: 6, type: "SELECT", order: 2, question: 'How do you say "Good evening"?' }, { id: 28, lessonId: 6, type: "SELECT", order: 3, question: 'How do you say "How are you?"' },
      { id: 29, lessonId: 6, type: "SELECT", order: 4, question: 'How do you say "I am fine"?' }, { id: 30, lessonId: 6, type: "SELECT", order: 5, question: 'How do you say "Take care"?' },
      { id: 31, lessonId: 7, type: "SELECT", order: 1, question: 'How do you say "What is your name?"' }, { id: 32, lessonId: 7, type: "SELECT", order: 2, question: 'How do you say "My name is..."?' },
      { id: 33, lessonId: 7, type: "SELECT", order: 3, question: 'How do you say "I am Filipino"?' }, { id: 34, lessonId: 7, type: "SELECT", order: 4, question: 'How do you say "Who are you?"' },
      { id: 35, lessonId: 7, type: "SELECT", order: 5, question: 'How do you say "Are you American?"' }, { id: 36, lessonId: 8, type: "SELECT", order: 1, question: 'How do you say "I like this"?' },
      { id: 37, lessonId: 8, type: "SELECT", order: 2, question: 'How do you say "I don\'t like this"?' }, { id: 38, lessonId: 8, type: "SELECT", order: 3, question: 'How do you say "I want to eat"?' },
      { id: 39, lessonId: 8, type: "SELECT", order: 4, question: 'How do you say "Do you like rice?"' }, { id: 40, lessonId: 8, type: "SELECT", order: 5, question: 'How do you say "I want water"?' },
      { id: 41, lessonId: 9, type: "SELECT", order: 1, question: 'How do you say "I love you"?' }, { id: 42, lessonId: 9, type: "SELECT", order: 2, question: 'How do you say "I miss you"?' },
      { id: 43, lessonId: 9, type: "SELECT", order: 3, question: 'How do you say "I am happy"?' }, { id: 44, lessonId: 9, type: "SELECT", order: 4, question: 'How do you say "I am sad"?' },
      { id: 45, lessonId: 9, type: "SELECT", order: 5, question: 'How do you say "Are you tired?"' }, { id: 46, lessonId: 10, type: "SELECT", order: 1, question: 'How do you say "Yes" (Polite)?' },
      { id: 47, lessonId: 10, type: "SELECT", order: 2, question: 'How do you say "No" (Polite)?' }, { id: 48, lessonId: 10, type: "SELECT", order: 3, question: 'How do you say "Thank you" (Polite)?' },
      { id: 49, lessonId: 10, type: "SELECT", order: 4, question: 'How do you say "Excuse me" (Polite)?' }, { id: 50, lessonId: 10, type: "SELECT", order: 5, question: 'How do you say "I don\'t know" (Polite)?' },

      // ============================================
      // CEBUANO CHALLENGES (51-100) - Existing content
      // ============================================
      { id: 51, lessonId: 11, type: "SELECT", order: 1, question: 'How do you say "Father"?' }, { id: 52, lessonId: 11, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 53, lessonId: 11, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' }, { id: 54, lessonId: 11, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 55, lessonId: 11, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' }, { id: 56, lessonId: 12, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 57, lessonId: 12, type: "SELECT", order: 2, question: 'How do you say "To drink"?' }, { id: 58, lessonId: 12, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 59, lessonId: 12, type: "SELECT", order: 4, question: 'How do you say "To walk"?' }, { id: 60, lessonId: 12, type: "SELECT", order: 5, question: 'How do you say "To read"?' },
      { id: 61, lessonId: 13, type: "SELECT", order: 1, question: 'How do you say "Beautiful" (for a person)?' }, { id: 62, lessonId: 13, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 63, lessonId: 13, type: "SELECT", order: 3, question: 'How do you say "Happy"?' }, { id: 64, lessonId: 13, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 65, lessonId: 13, type: "SELECT", order: 5, question: 'How do you say "Hot"?' }, { id: 66, lessonId: 14, type: "SELECT", order: 1, question: 'How do you say "Rice" (Cooked)?' },
      { id: 67, lessonId: 14, type: "SELECT", order: 2, question: 'How do you say "Water"?' }, { id: 68, lessonId: 14, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 69, lessonId: 14, type: "SELECT", order: 4, question: 'How do you say "Fish"?' }, { id: 70, lessonId: 14, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },
      { id: 71, lessonId: 15, type: "SELECT", order: 1, question: 'How do you say "Yes"?' }, { id: 72, lessonId: 15, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 73, lessonId: 15, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' }, { id: 74, lessonId: 15, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 75, lessonId: 15, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' }, { id: 76, lessonId: 16, type: "SELECT", order: 1, question: 'How do you say "Good afternoon"?' },
      { id: 77, lessonId: 16, type: "SELECT", order: 2, question: 'How do you say "Good evening"?' }, { id: 78, lessonId: 16, type: "SELECT", order: 3, question: 'How do you say "How are you?"' },
      { id: 79, lessonId: 16, type: "SELECT", order: 4, question: 'How do you say "I am fine"?' }, { id: 80, lessonId: 16, type: "SELECT", order: 5, question: 'How do you say "Take care"?' },
      { id: 81, lessonId: 17, type: "SELECT", order: 1, question: 'How do you say "What is your name?"' }, { id: 82, lessonId: 17, type: "SELECT", order: 2, question: 'How do you say "My name is..."?' },
      { id: 83, lessonId: 17, type: "SELECT", order: 3, question: 'How do you say "I am Filipino"?' }, { id: 84, lessonId: 17, type: "SELECT", order: 4, question: 'How do you say "Who are you?"' },
      { id: 85, lessonId: 17, type: "SELECT", order: 5, question: 'How do you say "Are you American?"' }, { id: 86, lessonId: 18, type: "SELECT", order: 1, question: 'How do you say "I like this"?' },
      { id: 87, lessonId: 18, type: "SELECT", order: 2, question: 'How do you say "I don\'t like this"?' }, { id: 88, lessonId: 18, type: "SELECT", order: 3, question: 'How do you say "I want to eat"?' },
      { id: 89, lessonId: 18, type: "SELECT", order: 4, question: 'How do you say "Do you like rice?"' }, { id: 90, lessonId: 18, type: "SELECT", order: 5, question: 'How do you say "I want water"?' },
      { id: 91, lessonId: 19, type: "SELECT", order: 1, question: 'How do you say "I love you"?' }, { id: 92, lessonId: 19, type: "SELECT", order: 2, question: 'How do you say "I miss you"?' },
      { id: 93, lessonId: 19, type: "SELECT", order: 3, question: 'How do you say "I am happy"?' }, { id: 94, lessonId: 19, type: "SELECT", order: 4, question: 'How do you say "I am sad"?' },
      { id: 95, lessonId: 19, type: "SELECT", order: 5, question: 'How do you say "Are you tired?"' }, { id: 96, lessonId: 20, type: "SELECT", order: 1, question: 'How do you say "Excuse me" (when passing)?' },
      { id: 97, lessonId: 20, type: "SELECT", order: 2, question: 'How do you say "I don\'t know"?' }, { id: 98, lessonId: 20, type: "SELECT", order: 3, question: 'How do you say "Thank you very much"?' },
      { id: 99, lessonId: 20, type: "SELECT", order: 4, question: 'How do you say "You\'re welcome"?' }, { id: 100, lessonId: 20, type: "SELECT", order: 5, question: 'How do you say "Let\'s eat"?' },

      // ============================================
      // HILIGAYNON CHALLENGES (101-125) - Unit 5 (Course ID 5)
      // ============================================
      { id: 101, lessonId: 21, type: "SELECT", order: 1, question: 'How do you say "Father"?' }, { id: 102, lessonId: 21, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 103, lessonId: 21, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' }, { id: 104, lessonId: 21, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 105, lessonId: 21, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' }, { id: 106, lessonId: 22, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 107, lessonId: 22, type: "SELECT", order: 2, question: 'How do you say "To drink"?' }, { id: 108, lessonId: 22, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 109, lessonId: 22, type: "SELECT", order: 4, question: 'How do you say "To walk"?' }, { id: 110, lessonId: 22, type: "SELECT", order: 5, question: 'How do you say "To read"?' },
      { id: 111, lessonId: 23, type: "SELECT", order: 1, question: 'How do you say "Beautiful"?' }, { id: 112, lessonId: 23, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 113, lessonId: 23, type: "SELECT", order: 3, question: 'How do you say "Happy"?' }, { id: 114, lessonId: 23, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 115, lessonId: 23, type: "SELECT", order: 5, question: 'How do you say "Hot"?' }, { id: 116, lessonId: 24, type: "SELECT", order: 1, question: 'How do you say "Rice"?' },
      { id: 117, lessonId: 24, type: "SELECT", order: 2, question: 'How do you say "Water"?' }, { id: 118, lessonId: 24, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 119, lessonId: 24, type: "SELECT", order: 4, question: 'How do you say "Fish"?' }, { id: 120, lessonId: 24, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },
      { id: 121, lessonId: 25, type: "SELECT", order: 1, question: 'How do you say "Yes"?' }, { id: 122, lessonId: 25, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 123, lessonId: 25, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' }, { id: 124, lessonId: 25, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 125, lessonId: 25, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' },

      // ============================================
      // ILOCANO CHALLENGES (126-150) - Unit 6 (Course ID 3)
      // ============================================
      { id: 126, lessonId: 26, type: "SELECT", order: 1, question: 'How do you say "Father"?' }, { id: 127, lessonId: 26, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 128, lessonId: 26, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' }, { id: 129, lessonId: 26, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 130, lessonId: 26, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' }, { id: 131, lessonId: 27, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 132, lessonId: 27, type: "SELECT", order: 2, question: 'How do you say "To drink"?' }, { id: 133, lessonId: 27, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 134, lessonId: 27, type: "SELECT", order: 4, question: 'How do you say "To walk"?' }, { id: 135, lessonId: 27, type: "SELECT", order: 5, question: 'How do you say "To read"?' },
      { id: 136, lessonId: 28, type: "SELECT", order: 1, question: 'How do you say "Beautiful"?' }, { id: 137, lessonId: 28, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 138, lessonId: 28, type: "SELECT", order: 3, question: 'How do you say "Happy"?' }, { id: 139, lessonId: 28, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 140, lessonId: 28, type: "SELECT", order: 5, question: 'How do you say "Hot"?' }, { id: 141, lessonId: 29, type: "SELECT", order: 1, question: 'How do you say "Rice"?' },
      { id: 142, lessonId: 29, type: "SELECT", order: 2, question: 'How do you say "Water"?' }, { id: 143, lessonId: 29, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 144, lessonId: 29, type: "SELECT", order: 4, question: 'How do you say "Fish"?' }, { id: 145, lessonId: 29, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },
      { id: 146, lessonId: 30, type: "SELECT", order: 1, question: 'How do you say "Yes"?' }, { id: 147, lessonId: 30, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 148, lessonId: 30, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' }, { id: 149, lessonId: 30, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 150, lessonId: 30, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' },

      // ============================================
      // PANGASINAN CHALLENGES (151-175) - Unit 7 (Course ID 4)
      // ============================================
      { id: 151, lessonId: 31, type: "SELECT", order: 1, question: 'How do you say "Father"?' }, { id: 152, lessonId: 31, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 153, lessonId: 31, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' }, { id: 154, lessonId: 31, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 155, lessonId: 31, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' }, { id: 156, lessonId: 32, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 157, lessonId: 32, type: "SELECT", order: 2, question: 'How do you say "To drink"?' }, { id: 158, lessonId: 32, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 159, lessonId: 32, type: "SELECT", order: 4, question: 'How do you say "To walk"?' }, { id: 160, lessonId: 32, type: "SELECT", order: 5, question: 'How do you say "To read"?' },
      { id: 161, lessonId: 33, type: "SELECT", order: 1, question: 'How do you say "Beautiful"?' }, { id: 162, lessonId: 33, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 163, lessonId: 33, type: "SELECT", order: 3, question: 'How do you say "Happy"?' }, { id: 164, lessonId: 33, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 165, lessonId: 33, type: "SELECT", order: 5, question: 'How do you say "Hot"?' }, { id: 166, lessonId: 34, type: "SELECT", order: 1, question: 'How do you say "Rice"?' },
      { id: 167, lessonId: 34, type: "SELECT", order: 2, question: 'How do you say "Water"?' }, { id: 168, lessonId: 34, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 169, lessonId: 34, type: "SELECT", order: 4, question: 'How do you say "Fish"?' }, { id: 170, lessonId: 34, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },
      { id: 171, lessonId: 35, type: "SELECT", order: 1, question: 'How do you say "Yes"?' }, { id: 172, lessonId: 35, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 173, lessonId: 35, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' }, { id: 174, lessonId: 35, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 175, lessonId: 35, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' },

      // ============================================
      // BAYBAYIN CHALLENGES (176-200) - Unit 8 (Course ID 6)
      // ============================================
      // U1-L1 (Vowels)
      { id: 176, lessonId: 36, type: "SELECT", order: 1, question: 'What is the sound of this character: ᜀ' },
      { id: 177, lessonId: 36, type: "SELECT", order: 2, question: 'What is the sound of this character: ᜁ' },
      { id: 178, lessonId: 36, type: "SELECT", order: 3, question: 'What is the sound of this character: ᜂ' },
      { id: 179, lessonId: 36, type: "SELECT", order: 4, question: 'Which character represents the sound "A"?' },
      { id: 180, lessonId: 36, type: "SELECT", order: 5, question: 'Which character represents the sound "O/U"?' },
      // U1-L2 (B-Syllables)
      { id: 181, lessonId: 37, type: "SELECT", order: 1, question: 'What is the sound of this base character: ᜊ' },
      { id: 182, lessonId: 37, type: "SELECT", order: 2, question: 'What is the sound of this character with a dot above (I-Kudlit): ᜊᜒ' },
      { id: 183, lessonId: 37, type: "SELECT", order: 3, question: 'What is the sound of this character with a dot below (U-Kudlit): ᜊᜓ' },
      { id: 184, lessonId: 37, type: "SELECT", order: 4, question: 'Which character represents the sound "BÁ"?' },
      { id: 185, lessonId: 37, type: "SELECT", order: 5, question: 'How do you write the syllable "BI"?' },
      // U1-L3 (D/L-Syllables)
      { id: 186, lessonId: 38, type: "SELECT", order: 1, question: 'What is the sound of this base character: ᜇ' },
      { id: 187, lessonId: 38, type: "SELECT", order: 2, question: 'How do you write the syllable "DÍ"?' },
      { id: 188, lessonId: 38, type: "SELECT", order: 3, question: 'What is the sound of ᜇ with a mark below: ᜇᜓ' },
      { id: 189, lessonId: 38, type: "SELECT", order: 4, question: 'Which character represents the sound "LÁ"?' },
      { id: 190, lessonId: 38, type: "SELECT", order: 5, question: 'Which character represents the sound "DO"?' },
      // U1-L4 (G-Syllables)
      { id: 191, lessonId: 39, type: "SELECT", order: 1, question: 'How do you write the syllable "GÍ"?' },
      { id: 192, lessonId: 39, type: "SELECT", order: 2, question: 'What is the base sound of this syllable: ᜄ' },
      { id: 193, lessonId: 39, type: "SELECT", order: 3, question: 'How do you write the syllable "GU"?' },
      { id: 194, lessonId: 39, type: "SELECT", order: 4, question: 'What is the sound of ᜄ with a mark above: ᜄᜒ' },
      { id: 195, lessonId: 39, type: "SELECT", order: 5, question: 'Which character represents the sound "GÓ"?' },
      // U1-L5 (Final Consonants)
      { id: 196, lessonId: 40, type: "SELECT", order: 1, question: 'What is the sound of this sequence: ᜊᜆ᜔' },
      { id: 197, lessonId: 40, type: "SELECT", order: 2, question: 'Which combination spells the word "IBON"?' },
      { id: 198, lessonId: 40, type: "SELECT", order: 3, question: 'What is the sound of this sequence: ᜀᜆ᜔' },
      { id: 199, lessonId: 40, type: "SELECT", order: 4, question: 'How do you write the final consonant "K" in Baybayin?' },
      { id: 200, lessonId: 40, type: "SELECT", order: 5, question: 'What is the sound of ᜆ with a cross kudlit: ᜆ᜔' },
    ]);

    // 5. Insert Challenge Options (Correct options randomly placed)
    await db.insert(schema.challengeOptions).values([
      // ============================================
      // FILIPINO OPTIONS (1-50) - Existing shuffled content
      // ============================================
      // (Content unchanged, using previous option IDs 1-150)
      // U1-L1-C1: Father
      { challengeId: 1, correct: false, text: "Nanay", audioSrc: "/ph_nanay.mp3" }, { challengeId: 1, correct: true, text: "Tatay", audioSrc: "/ph_tatay.mp3" }, { challengeId: 1, correct: false, text: "Kuya", audioSrc: "/ph_kuya.mp3" },
      // U1-L1-C2: Mother
      { challengeId: 2, correct: false, text: "Tatay", audioSrc: "/ph_tatay.mp3" }, { challengeId: 2, correct: true, text: "Nanay", audioSrc: "/ph_nanay.mp3" }, { challengeId: 2, correct: false, text: "Ate", audioSrc: "/ph_ate.mp3" },
      // U1-L1-C3: Older Brother
      { challengeId: 3, correct: false, text: "Lolo", audioSrc: "/ph_lolo.mp3" }, { challengeId: 3, correct: false, text: "Bunso", audioSrc: "/ph_bunso.mp3" }, { challengeId: 3, correct: true, text: "Kuya", audioSrc: "/ph_kuya.mp3" },
      // U1-L1-C4: Older Sister
      { challengeId: 4, correct: true, text: "Ate", audioSrc: "/ph_ate.mp3" }, { challengeId: 4, correct: false, text: "Kuya", audioSrc: "/ph_kuya.mp3" }, { challengeId: 4, correct: false, text: "Tita", audioSrc: "/ph_tita.mp3" },
      // U1-L1-C5: Grandfather
      { challengeId: 5, correct: false, text: "Lola", audioSrc: "/ph_lola.mp3" }, { challengeId: 5, correct: true, text: "Lolo", audioSrc: "/ph_lolo.mp3" }, { challengeId: 5, correct: false, text: "Tito", audioSrc: "/ph_tito.mp3" },
      // U1-L2-C1: Eat
      { challengeId: 6, correct: false, text: "Uminom", audioSrc: "/ph_uminom.mp3" }, { challengeId: 6, correct: false, text: "Matulog", audioSrc: "/ph_matulog.mp3" }, { challengeId: 6, correct: true, text: "Kumain", audioSrc: "/ph_kumain.mp3" },
      // U1-L2-C2: Drink
      { challengeId: 7, correct: true, text: "Uminom", audioSrc: "/ph_uminom.mp3" }, { challengeId: 7, correct: false, text: "Kumain", audioSrc: "/ph_kumain.mp3" }, { challengeId: 7, correct: false, text: "Tumakbo", audioSrc: "/ph_tumakbo.mp3" },
      // U1-L2-C3: Sleep
      { challengeId: 8, correct: false, text: "Gumising", audioSrc: "/ph_gumising.mp3" }, { challengeId: 8, correct: true, text: "Matulog", audioSrc: "/ph_matulog.mp3" }, { challengeId: 8, correct: false, text: "Maglakad", audioSrc: "/ph_maglakad.mp3" },
      // U1-L2-C4: Walk
      { challengeId: 9, correct: false, text: "Umupo", audioSrc: "/ph_umupo.mp3" }, { challengeId: 9, correct: true, text: "Maglakad", audioSrc: "/ph_maglakad.mp3" }, { challengeId: 9, correct: false, text: "Tumawa", audioSrc: "/ph_tumawa.mp3" },
      // U1-L2-C5: Read
      { challengeId: 10, correct: false, text: "Magsulat", audioSrc: "/ph_magsulat.mp3" }, { challengeId: 10, correct: false, text: "Magluto", audioSrc: "/ph_magluto.mp3" }, { challengeId: 10, correct: true, text: "Magbasa", audioSrc: "/ph_magbasa.mp3" },
      // U1-L3-C1: Beautiful
      { challengeId: 11, correct: false, text: "Pangit", audioSrc: "/ph_pangit.mp3" }, { challengeId: 11, correct: true, text: "Maganda", audioSrc: "/ph_maganda.mp3" }, { challengeId: 11, correct: false, text: "Maliit", audioSrc: "/ph_maliit.mp3" },
      // U1-L3-C2: Big
      { challengeId: 12, correct: false, text: "Maliit", audioSrc: "/ph_maliit.mp3" }, { challengeId: 12, correct: true, text: "Malaki", audioSrc: "/ph_malaki.mp3" }, { challengeId: 12, correct: false, text: "Payat", audioSrc: "/ph_payat.mp3" },
      // U1-L3-C3: Happy
      { challengeId: 13, correct: true, text: "Masaya", audioSrc: "/ph_masaya.mp3" }, { challengeId: 13, correct: false, text: "Malungkot", audioSrc: "/ph_malungkot.mp3" }, { challengeId: 13, correct: false, text: "Galit", audioSrc: "/ph_galit.mp3" },
      // U1-L3-C4: Delicious
      { challengeId: 14, correct: false, text: "Mapait", audioSrc: "/ph_mapait.mp3" }, { challengeId: 14, correct: false, text: "Maalat", audioSrc: "/ph_maalat.mp3" }, { challengeId: 14, correct: true, text: "Masarap", audioSrc: "/ph_masarap.mp3" },
      // U1-L3-C5: Hot
      { challengeId: 15, correct: false, text: "Malamig", audioSrc: "/ph_malamig.mp3" }, { challengeId: 15, correct: true, text: "Mainit", audioSrc: "/ph_mainit.mp3" }, { challengeId: 15, correct: false, text: "Mabigat", audioSrc: "/ph_mabigat.mp3" },
      // U1-L4-C1: Rice
      { challengeId: 16, correct: false, text: "Ulam", audioSrc: "/ph_ulam.mp3" }, { challengeId: 16, correct: true, text: "Kanin", audioSrc: "/ph_kanin.mp3" }, { challengeId: 16, correct: false, text: "Sabaw", audioSrc: "/ph_sabaw.mp3" },
      // U1-L4-C2: Water
      { challengeId: 17, correct: true, text: "Tubig", audioSrc: "/ph_tubig.mp3" }, { challengeId: 17, correct: false, text: "Kape", audioSrc: "/ph_kape.mp3" }, { challengeId: 17, correct: false, text: "Gatas", audioSrc: "/ph_gatas.mp3" },
      // U1-L4-C3: Bread
      { challengeId: 18, correct: false, text: "Itlog", audioSrc: "/ph_itlog.mp3" }, { challengeId: 18, correct: false, text: "Asukal", audioSrc: "/ph_asukal.mp3" }, { challengeId: 18, correct: true, text: "Tinapay", audioSrc: "/ph_tinapay.mp3" },
      // U1-L4-C4: Fish
      { challengeId: 19, correct: false, text: "Manok", audioSrc: "/ph_manok.mp3" }, { challengeId: 19, correct: true, text: "Isda", audioSrc: "/ph_isda.mp3" }, { challengeId: 19, correct: false, text: "Baboy", audioSrc: "/ph_baboy.mp3" },
      // U1-L4-C5: Chicken
      { challengeId: 20, correct: false, text: "Baka", audioSrc: "/ph_baka.mp3" }, { challengeId: 20, correct: false, text: "Gulay", audioSrc: "/ph_gulay.mp3" }, { challengeId: 20, correct: true, text: "Manok", audioSrc: "/ph_manok.mp3" },
      // U1-L5-C1: Yes
      { challengeId: 21, correct: true, text: "Oo", audioSrc: "/ph_oo.mp3" }, { challengeId: 21, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" }, { challengeId: 21, correct: false, text: "Wala", audioSrc: "/ph_wala.mp3" },
      // U1-L5-C2: No
      { challengeId: 22, correct: false, text: "Oo", audioSrc: "/ph_oo.mp3" }, { challengeId: 22, correct: true, text: "Hindi", audioSrc: "/ph_hindi.mp3" }, { challengeId: 22, correct: false, text: "Mayroon", audioSrc: "/ph_mayroon.mp3" },
      // U1-L5-C3: Thank you
      { challengeId: 23, correct: false, text: "Paalam", audioSrc: "/ph_paalam.mp3" }, { challengeId: 23, correct: false, text: "Kamusta", audioSrc: "/ph_kamusta.mp3" }, { challengeId: 23, correct: true, text: "Salamat", audioSrc: "/ph_salamat.mp3" },
      // U1-L5-C4: Good morning
      { challengeId: 24, correct: false, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" }, { challengeId: 24, correct: true, text: "Magandang umaga", audioSrc: "/ph_umaga.mp3" }, { challengeId: 24, correct: false, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" },
      // U1-L5-C5: Goodbye
      { challengeId: 25, correct: false, text: "Salamat", audioSrc: "/ph_salamat.mp3" }, { challengeId: 25, correct: true, text: "Paalam", audioSrc: "/ph_paalam.mp3" }, { challengeId: 25, correct: false, text: "Mahal kita", audioSrc: "/ph_mahalkita.mp3" },
      // U2-L1-C1: Good afternoon
      { challengeId: 26, correct: false, text: "Magandang umaga", audioSrc: "/ph_umaga.mp3" }, { challengeId: 26, correct: true, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" }, { challengeId: 26, correct: false, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" },
      // U2-L1-C2: Good evening
      { challengeId: 27, correct: false, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" }, { challengeId: 27, correct: false, text: "Paalam na", audioSrc: "/ph_paalam.mp3" }, { challengeId: 27, correct: true, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" },
      // U2-L1-C3: How are you?
      { challengeId: 28, correct: true, text: "Kamusta ka?", audioSrc: "/ph_kamusta.mp3" }, { challengeId: 28, correct: false, text: "Sino ka?", audioSrc: "/ph_sino.mp3" }, { challengeId: 28, correct: false, text: "Nasaan ka?", audioSrc: "/ph_nasaan.mp3" },
      // U2-L1-C4: I am fine
      { challengeId: 29, correct: false, text: "Masama naman", audioSrc: "/ph_masama.mp3" }, { challengeId: 29, correct: true, text: "Mabuti naman", audioSrc: "/ph_mabuti.mp3" }, { challengeId: 29, correct: false, text: "Wala naman", audioSrc: "/ph_wala.mp3" },
      // U2-L1-C5: Take care
      { challengeId: 30, correct: false, text: "Alis", audioSrc: "/ph_alis.mp3" }, { challengeId: 30, correct: false, text: "Tulog", audioSrc: "/ph_tulog.mp3" }, { challengeId: 30, correct: true, text: "Ingat", audioSrc: "/ph_ingat.mp3" },
      // U2-L2-C1: What is your name?
      { challengeId: 31, correct: false, text: "Taga-saan ka?", audioSrc: "/ph_tagasaan.mp3" }, { challengeId: 31, correct: true, text: "Anong pangalan mo?", audioSrc: "/ph_pangalan.mp3" }, { challengeId: 31, correct: false, text: "Ilang taon ka na?", audioSrc: "/ph_edad.mp3" },
      // U2-L2-C2: My name is...
      { challengeId: 32, correct: true, text: "Ang pangalan ko ay...", audioSrc: "/ph_myname.mp3" }, { challengeId: 32, correct: false, text: "Ang gusto ko ay...", audioSrc: "/ph_gusto.mp3" }, { challengeId: 32, correct: false, text: "Ang kapatid ko ay...", audioSrc: "/ph_kapatid.mp3" },
      // U2-L2-C3: I am Filipino
      { challengeId: 33, correct: false, text: "Ikaw ay Pilipino", audioSrc: "/ph_ikaw.mp3" }, { challengeId: 33, correct: true, text: "Ako ay Pilipino", audioSrc: "/ph_filipino.mp3" }, { challengeId: 33, correct: false, text: "Siya ay Pilipino", audioSrc: "/ph_siya.mp3" },
      // U2-L2-C4: Who are you?
      { challengeId: 34, correct: false, text: "Ano ka?", audioSrc: "/ph_ano.mp3" }, { challengeId: 34, correct: true, text: "Sino ka?", audioSrc: "/ph_sino.mp3" }, { challengeId: 34, correct: false, text: "Bakit ka?", audioSrc: "/ph_bakit.mp3" },
      // U2-L2-C5: Are you American?
      { challengeId: 35, correct: false, text: "Pilipino ka ba?", audioSrc: "/ph_pilipino.mp3" }, { challengeId: 35, correct: false, text: "Saan ka galing?", audioSrc: "/ph_saan.mp3" }, { challengeId: 35, correct: true, text: "Amerikano ka ba?", audioSrc: "/ph_amerikano.mp3" },
      // U2-L3-C1: I like this
      { challengeId: 36, correct: true, text: "Gusto ko ito", audioSrc: "/ph_gusto.mp3" }, { challengeId: 36, correct: false, text: "Ayaw ko ito", audioSrc: "/ph_ayaw.mp3" }, { challengeId: 36, correct: false, text: "Meron ako nito", audioSrc: "/ph_meron.mp3" },
      // U2-L3-C2: I don't like this
      { challengeId: 37, correct: false, text: "Gusto ko nito", audioSrc: "/ph_gusto.mp3" }, { challengeId: 37, correct: true, text: "Ayaw ko nito", audioSrc: "/ph_ayaw.mp3" }, { challengeId: 37, correct: false, text: "Mahal ko ito", audioSrc: "/ph_mahal.mp3" },
      // U2-L3-C3: I want to eat
      { challengeId: 38, correct: false, text: "Gusto kong matulog", audioSrc: "/ph_gustomatulog.mp3" }, { challengeId: 38, correct: true, text: "Gusto kong kumain", audioSrc: "/ph_gustokumain.mp3" }, { challengeId: 38, correct: false, text: "Ayaw kong kumain", audioSrc: "/ph_ayawkumain.mp3" },
      // U2-L3-C4: Do you like rice?
      { challengeId: 39, correct: false, text: "Gusto mo ba ng tubig?", audioSrc: "/ph_gustotubig.mp3" }, { challengeId: 39, correct: true, text: "Gusto mo ba ng kanin?", audioSrc: "/ph_gustokanin.mp3" }, { challengeId: 39, correct: false, text: "Meron ka bang kanin?", audioSrc: "/ph_meronkanin.mp3" },
      // U2-L3-C5: I want water
      { challengeId: 40, correct: false, text: "Ayaw ko ng tubig", audioSrc: "/ph_ayawtubig.mp3" }, { challengeId: 40, correct: false, text: "Uminom ako ng tubig", audioSrc: "/ph_inomtubig.mp3" }, { challengeId: 40, correct: true, text: "Gusto ko ng tubig", audioSrc: "/ph_gustotubig.mp3" },
      // U2-L4-C1: I love you
      { challengeId: 41, correct: true, text: "Mahal kita", audioSrc: "/ph_mahalkita.mp3" }, { challengeId: 41, correct: false, text: "Mahal ko siya", audioSrc: "/ph_mahalsiya.mp3" }, { challengeId: 41, correct: false, text: "Galit ako", audioSrc: "/ph_galit.mp3" },
      // U2-L4-C2: I miss you
      { challengeId: 42, correct: false, text: "Ayaw na kita", audioSrc: "/ph_ayawkita.mp3" }, { challengeId: 42, correct: true, text: "Miss na kita", audioSrc: "/ph_misskita.mp3" }, { challengeId: 42, correct: false, text: "Aalis na ako", audioSrc: "/ph_aalis.mp3" },
      // U2-L4-C3: I am happy
      { challengeId: 43, correct: false, text: "Malungkot ako", audioSrc: "/ph_malungkot.mp3" }, { challengeId: 43, correct: false, text: "Gutom ako", audioSrc: "/ph_gutom.mp3" }, { challengeId: 43, correct: true, text: "Masaya ako", audioSrc: "/ph_masaya.mp3" },
      // U2-L4-C4: I am sad
      { challengeId: 44, correct: true, text: "Malungkot ako", audioSrc: "/ph_malungkot.mp3" }, { challengeId: 44, correct: false, text: "Masaya ako", audioSrc: "/ph_masaya.mp3" }, { challengeId: 44, correct: false, text: "Pagod ako", audioSrc: "/ph_pagod.mp3" },
      // U2-L4-C5: Are you tired?
      { challengeId: 45, correct: false, text: "Galit ka ba?", audioSrc: "/ph_galit.mp3" }, { challengeId: 45, correct: true, text: "Pagod ka ba?", audioSrc: "/ph_pagod.mp3" }, { challengeId: 45, correct: false, text: "Gutom ka ba?", audioSrc: "/ph_gutom.mp3" },
      // U2-L5-C1: Yes (Polite)
      { challengeId: 46, correct: false, text: "Oo", audioSrc: "/ph_oo.mp3" }, { challengeId: 46, correct: true, text: "Opo", audioSrc: "/ph_opo.mp3" }, { challengeId: 46, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" },
      // U2-L5-C2: No (Polite)
      { challengeId: 47, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" }, { challengeId: 47, correct: false, text: "Wala po", audioSrc: "/ph_walapo.mp3" }, { challengeId: 47, correct: true, text: "Hindi po", audioSrc: "/ph_hindipo.mp3" },
      // U2-L5-C3: Thank you (Polite)
      { challengeId: 48, correct: true, text: "Salamat po", audioSrc: "/ph_salamatpo.mp3" }, { challengeId: 48, correct: false, text: "Walang anuman", audioSrc: "/ph_walanganuman.mp3" }, { challengeId: 48, correct: false, text: "Pasensya na", audioSrc: "/ph_pasensya.mp3" },
      // U2-L5-C4: Excuse me
      { challengeId: 49, correct: false, text: "Aalis na po", audioSrc: "/ph_aalis.mp3" }, { challengeId: 49, correct: true, text: "Makikiraan po", audioSrc: "/ph_makikiraan.mp3" }, { challengeId: 49, correct: false, text: "Dito lang po", audioSrc: "/ph_dito.mp3" },
      // U2-L5-C5: I don't know (Polite)
      { challengeId: 50, correct: false, text: "Alam ko po", audioSrc: "/ph_alamko.mp3" }, { challengeId: 50, correct: false, text: "Hindi ko alam", audioSrc: "/ph_hindialam.mp3" }, { challengeId: 50, correct: true, text: "Hindi ko po alam", audioSrc: "/ph_hindialam.mp3" },

      // ============================================
      // CEBUANO OPTIONS (51-100) - Existing shuffled content
      // ============================================
      // (Content unchanged, using previous option IDs 151-300)
      // U1-L1-C1: Father (Tatay)
      { challengeId: 51, correct: false, text: "Nanay", audioSrc: "/cebu_nanay.mp3" }, { challengeId: 51, correct: true, text: "Tatay", audioSrc: "/cebu_tatay.mp3" }, { challengeId: 51, correct: false, text: "Manoy", audioSrc: "/cebu_manoy.mp3" },
      // U1-L1-C2: Mother (Nanay)
      { challengeId: 52, correct: false, text: "Tatay", audioSrc: "/cebu_tatay.mp3" }, { challengeId: 52, correct: true, text: "Nanay", audioSrc: "/cebu_nanay.mp3" }, { challengeId: 52, correct: false, text: "Manang", audioSrc: "/cebu_manang.mp3" },
      // U1-L1-C3: Older Brother (Manoy)
      { challengeId: 53, correct: false, text: "Bunso", audioSrc: "/cebu_bunso.mp3" }, { challengeId: 53, correct: true, text: "Manoy", audioSrc: "/cebu_manoy.mp3" }, { challengeId: 53, correct: false, text: "Lolo", audioSrc: "/cebu_lolo.mp3" },
      // U1-L1-C4: Older Sister (Manang)
      { challengeId: 54, correct: true, text: "Manang", audioSrc: "/cebu_manang.mp3" }, { challengeId: 54, correct: false, text: "Manoy", audioSrc: "/cebu_manoy.mp3" }, { challengeId: 54, correct: false, text: "Tita", audioSrc: "/cebu_tita.mp3" },
      // U1-L1-C5: Grandfather (Lolo)
      { challengeId: 55, correct: false, text: "Lola", audioSrc: "/cebu_lola.mp3" }, { challengeId: 55, correct: false, text: "Tito", audioSrc: "/cebu_tito.mp3" }, { challengeId: 55, correct: true, text: "Lolo", audioSrc: "/cebu_lolo.mp3" },
      // U1-L2-C1: Eat (Mokaon)
      { challengeId: 56, correct: false, text: "Moinom", audioSrc: "/cebu_moinom.mp3" }, { challengeId: 56, correct: true, text: "Mokaon", audioSrc: "/cebu_mokaon.mp3" }, { challengeId: 56, correct: false, text: "Matulog", audioSrc: "/cebu_matulog.mp3" },
      // U1-L2-C2: Drink (Moinom)
      { challengeId: 57, correct: false, text: "Mokaon", audioSrc: "/cebu_mokaon.mp3" }, { challengeId: 57, correct: false, text: "Modagan", audioSrc: "/cebu_modagan.mp3" }, { challengeId: 57, correct: true, text: "Moinom", audioSrc: "/cebu_moinom.mp3" },
      // U1-L2-C3: Sleep (Matulog)
      { challengeId: 58, correct: true, text: "Matulog", audioSrc: "/cebu_matulog.mp3" }, { challengeId: 58, correct: false, text: "Momata", audioSrc: "/cebu_momata.mp3" }, { challengeId: 58, correct: false, text: "Maglakaw", audioSrc: "/cebu_maglakaw.mp3" },
      // U1-L2-C4: Walk (Maglakaw)
      { challengeId: 59, correct: false, text: "Molingkod", audioSrc: "/cebu_molingkod.mp3" }, { challengeId: 59, correct: true, text: "Maglakaw", audioSrc: "/cebu_maglakaw.mp3" }, { challengeId: 59, correct: false, text: "Mokatawa", audioSrc: "/cebu_mokatawa.mp3" },
      // U1-L2-C5: Read (Magbasa)
      { challengeId: 60, correct: false, text: "Magsulat", audioSrc: "/cebu_magsulat.mp3" }, { challengeId: 60, correct: true, text: "Magbasa", audioSrc: "/cebu_magbasa.mp3" }, { challengeId: 60, correct: false, text: "Magluto", audioSrc: "/cebu_magluto.mp3" },
      // U1-L3-C1: Beautiful (Gwapa)
      { challengeId: 61, correct: false, text: "Bati", audioSrc: "/cebu_bati.mp3" }, { challengeId: 61, correct: false, text: "Gamay", audioSrc: "/cebu_gamay.mp3" }, { challengeId: 61, correct: true, text: "Gwapa", audioSrc: "/cebu_gwapa.mp3" },
      // U1-L3-C2: Big (Dako)
      { challengeId: 62, correct: true, text: "Dako", audioSrc: "/cebu_dako.mp3" }, { challengeId: 62, correct: false, text: "Gamay", audioSrc: "/cebu_gamay.mp3" }, { challengeId: 62, correct: false, text: "Niwang", audioSrc: "/cebu_niwang.mp3" },
      // U1-L3-C3: Happy (Malipayon)
      { challengeId: 63, correct: false, text: "Guol", audioSrc: "/cebu_guol.mp3" }, { challengeId: 63, correct: true, text: "Malipayon", audioSrc: "/cebu_malipayon.mp3" }, { challengeId: 63, correct: false, text: "Isog", audioSrc: "/cebu_isog.mp3" },
      // U1-L3-C4: Delicious (Lami)
      { challengeId: 64, correct: false, text: "Pait", audioSrc: "/cebu_pait.mp3" }, { challengeId: 64, correct: true, text: "Lami", audioSrc: "/cebu_lami.mp3" }, { challengeId: 64, correct: false, text: "Parat", audioSrc: "/cebu_parat.mp3" },
      // U1-L3-C5: Hot (Init)
      { challengeId: 65, correct: true, text: "Init", audioSrc: "/cebu_init.mp3" }, { challengeId: 65, correct: false, text: "Bugnaw", audioSrc: "/cebu_bugnaw.mp3" }, { challengeId: 65, correct: false, text: "Bug-at", audioSrc: "/cebu_bugat.mp3" },
      // U1-L4-C1: Rice (Kan-on)
      { challengeId: 66, correct: false, text: "Sud-an", audioSrc: "/cebu_sudan.mp3" }, { challengeId: 66, correct: false, text: "Sabaw", audioSrc: "/cebu_sabaw.mp3" }, { challengeId: 66, correct: true, text: "Kan-on", audioSrc: "/cebu_kanon.mp3" },
      // U1-L4-C2: Water (Tubig)
      { challengeId: 67, correct: true, text: "Tubig", audioSrc: "/cebu_tubig.mp3" }, { challengeId: 67, correct: false, text: "Kape", audioSrc: "/cebu_kape.mp3" }, { challengeId: 67, correct: false, text: "Gatas", audioSrc: "/cebu_gatas.mp3" },
      // U1-L4-C3: Bread (Pan)
      { challengeId: 68, correct: false, text: "Itlog", audioSrc: "/cebu_itlog.mp3" }, { challengeId: 68, correct: true, text: "Pan", audioSrc: "/cebu_pan.mp3" }, { challengeId: 68, correct: false, text: "Asukal", audioSrc: "/cebu_asukal.mp3" },
      // U1-L4-C4: Fish (Isda)
      { challengeId: 69, correct: false, text: "Manok", audioSrc: "/cebu_manok.mp3" }, { challengeId: 69, correct: true, text: "Isda", audioSrc: "/cebu_isda.mp3" }, { challengeId: 69, correct: false, text: "Baboy", audioSrc: "/cebu_baboy.mp3" },
      // U1-L4-C5: Chicken (Manok)
      { challengeId: 70, correct: false, text: "Baka", audioSrc: "/cebu_baka.mp3" }, { challengeId: 70, correct: false, text: "Gulay", audioSrc: "/cebu_gulay.mp3" }, { challengeId: 70, correct: true, text: "Manok", audioSrc: "/cebu_manok.mp3" },
      // U1-L5-C1: Yes (O)
      { challengeId: 71, correct: true, text: "O", audioSrc: "/cebu_o.mp3" }, { challengeId: 71, correct: false, text: "Dili", audioSrc: "/cebu_dili.mp3" }, { challengeId: 71, correct: false, text: "Wala", audioSrc: "/cebu_wala.mp3" },
      // U1-L5-C2: No (Dili)
      { challengeId: 72, correct: false, text: "O", audioSrc: "/cebu_o.mp3" }, { challengeId: 72, correct: true, text: "Dili", audioSrc: "/cebu_dili.mp3" }, { challengeId: 72, correct: false, text: "Naa", audioSrc: "/cebu_naa.mp3" },
      // U1-L5-C3: Thank you (Salamat)
      { challengeId: 73, correct: false, text: "Babay", audioSrc: "/cebu_babay.mp3" }, { challengeId: 73, correct: true, text: "Salamat", audioSrc: "/cebu_salamat.mp3" }, { challengeId: 73, correct: false, text: "Kumusta", audioSrc: "/cebu_kumusta.mp3" },
      // U1-L5-C4: Good morning (Maayong buntag)
      { challengeId: 74, correct: true, text: "Maayong buntag", audioSrc: "/cebu_buntag.mp3" }, { challengeId: 74, correct: false, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" }, { challengeId: 74, correct: false, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" },
      // U1-L5-C5: Goodbye (Babay / Ayo-ayo)
      { challengeId: 75, correct: false, text: "Salamat", audioSrc: "/cebu_salamat.mp3" }, { challengeId: 75, correct: false, text: "Gimingaw ko", audioSrc: "/cebu_gimingaw.mp3" }, { challengeId: 75, correct: true, text: "Babay / Ayo-ayo", audioSrc: "/cebu_babay.mp3" },
      // U2-L1-C1: Good afternoon (Maayong hapon)
      { challengeId: 76, correct: false, text: "Maayong buntag", audioSrc: "/cebu_buntag.mp3" }, { challengeId: 76, correct: true, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" }, { challengeId: 76, correct: false, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" },
      // U2-L1-C2: Good evening (Maayong gabii)
      { challengeId: 77, correct: false, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" }, { challengeId: 77, correct: true, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" }, { challengeId: 77, correct: false, text: "Babay na", audioSrc: "/cebu_babay.mp3" },
      // U2-L1-C3: How are you? (Kumusta ka?)
      { challengeId: 78, correct: true, text: "Kumusta ka?", audioSrc: "/cebu_kumusta.mp3" }, { challengeId: 78, correct: false, text: "Kinsa ka?", audioSrc: "/cebu_kinsa.mp3" }, { challengeId: 78, correct: false, text: "Asa ka?", audioSrc: "/cebu_asa.mp3" },
      // U2-L1-C4: I am fine (Maayo ra)
      { challengeId: 79, correct: false, text: "Bati ra", audioSrc: "/cebu_bati.mp3" }, { challengeId: 79, correct: true, text: "Maayo ra", audioSrc: "/cebu_maayo.mp3" }, { challengeId: 79, correct: false, text: "Wala ra", audioSrc: "/cebu_wala.mp3" },
      // U2-L1-C5: Take care (Pag-amping)
      { challengeId: 80, correct: false, text: "Lakaw na", audioSrc: "/cebu_lakaw.mp3" }, { challengeId: 80, correct: false, text: "Tulog na", audioSrc: "/cebu_tulog.mp3" }, { challengeId: 80, correct: true, text: "Pag-amping", audioSrc: "/cebu_amping.mp3" },
      // U2-L2-C1: What is your name? (Unsay ngalan nimo?)
      { challengeId: 81, correct: false, text: "Taga-asa ka?", audioSrc: "/cebu_asa.mp3" }, { challengeId: 81, correct: true, text: "Unsay ngalan nimo?", audioSrc: "/cebu_ngalan.mp3" }, { challengeId: 81, correct: false, text: "Pila imong edad?", audioSrc: "/cebu_edad.mp3" },
      // U2-L2-C2: My name is... (Ang ngalan nako kay...)
      { challengeId: 82, correct: true, text: "Ang ngalan nako kay...", audioSrc: "/cebu_myname.mp3" }, { challengeId: 82, correct: false, text: "Ang gusto nako kay...", audioSrc: "/cebu_gusto.mp3" }, { challengeId: 82, correct: false, text: "Ang igsoon nako kay...", audioSrc: "/cebu_igsoon.mp3" },
      // U2-L2-C3: I am Filipino (Pilipino ko)
      { challengeId: 83, correct: false, text: "Pilipino ka", audioSrc: "/cebu_pilipinoka.mp3" }, { challengeId: 83, correct: true, text: "Pilipino ko", audioSrc: "/cebu_pilipinoko.mp3" }, { challengeId: 83, correct: false, text: "Pilipino siya", audioSrc: "/cebu_pilipinosiya.mp3" },
      // U2-L2-C4: Who are you? (Kinsa ka?)
      { challengeId: 84, correct: false, text: "Unsa ka?", audioSrc: "/cebu_unsa.mp3" }, { challengeId: 84, correct: true, text: "Kinsa ka?", audioSrc: "/cebu_kinsa.mp3" }, { challengeId: 84, correct: false, text: "Ngano ka?", audioSrc: "/cebu_ngano.mp3" },
      // U2-L2-C5: Are you American? (Amerikano ka ba?)
      { challengeId: 85, correct: false, text: "Pilipino ka ba?", audioSrc: "/cebu_pilipino.mp3" }, { challengeId: 85, correct: false, text: "Asa ka gikan?", audioSrc: "/cebu_asagikan.mp3" }, { challengeId: 85, correct: true, text: "Amerikano ka ba?", audioSrc: "/cebu_amerikano.mp3" },
      // U2-L3-C1: I like this (Ganahan ko ani)
      { challengeId: 86, correct: true, text: "Ganahan ko ani", audioSrc: "/cebu_ganahan.mp3" }, { challengeId: 86, correct: false, text: "Dili ko ganahan ani", audioSrc: "/cebu_diligana.mp3" }, { challengeId: 86, correct: false, text: "Naa ko ani", audioSrc: "/cebu_naako.mp3" },
      // U2-L3-C2: I don't like this (Dili ko ganahan ani)
      { challengeId: 87, correct: false, text: "Ganahan ko ani", audioSrc: "/cebu_ganahan.mp3" }, { challengeId: 87, correct: true, text: "Dili ko ganahan ani", audioSrc: "/cebu_diligana.mp3" }, { challengeId: 87, correct: false, text: "Mahal nako ni", audioSrc: "/cebu_mahal.mp3" },
      // U2-L3-C3: I want to eat (Gusto ko mokaon)
      { challengeId: 88, correct: false, text: "Gusto ko matulog", audioSrc: "/cebu_gustomatulog.mp3" }, { challengeId: 88, correct: true, text: "Gusto ko mokaon", audioSrc: "/cebu_gustomokaon.mp3" }, { challengeId: 88, correct: false, text: "Dili ko mokaon", audioSrc: "/cebu_dilimokaon.mp3" },
      // U2-L3-C4: Do you like rice? (Ganahan ka og kan-on?)
      { challengeId: 89, correct: false, text: "Ganahan ka og tubig?", audioSrc: "/cebu_ganahantubig.mp3" }, { challengeId: 89, correct: true, text: "Ganahan ka og kan-on?", audioSrc: "/cebu_ganahankanon.mp3" }, { challengeId: 89, correct: false, text: "Naa kay kan-on?", audioSrc: "/cebu_naakanon.mp3" },
      // U2-L3-C5: I want water (Gusto ko og tubig)
      { challengeId: 90, correct: false, text: "Dili ko og tubig", audioSrc: "/cebu_dilitubig.mp3" }, { challengeId: 90, correct: false, text: "Moinom ko og tubig", audioSrc: "/cebu_inomtubig.mp3" }, { challengeId: 90, correct: true, text: "Gusto ko og tubig", audioSrc: "/cebu_gustotubig.mp3" },
      // U2-L4-C1: I love you (Gihigugma tika)
      { challengeId: 91, correct: true, text: "Gihigugma tika", audioSrc: "/cebu_gihigugma.mp3" }, { challengeId: 91, correct: false, text: "Gihigugma niya", audioSrc: "/cebu_gihigugmaniya.mp3" }, { challengeId: 91, correct: false, text: "Isog ko", audioSrc: "/cebu_isog.mp3" },
      // U2-L4-C2: I miss you (Gimingaw ko nimo)
      { challengeId: 92, correct: false, text: "Dili ko nimo", audioSrc: "/cebu_diliko.mp3" }, { challengeId: 92, correct: true, text: "Gimingaw ko nimo", audioSrc: "/cebu_gimingaw.mp3" }, { challengeId: 92, correct: false, text: "Molakaw na ko", audioSrc: "/cebu_molakaw.mp3" },
      // U2-L4-C3: I am happy (Malipayon ko)
      { challengeId: 93, correct: false, text: "Guol ko", audioSrc: "/cebu_guol.mp3" }, { challengeId: 93, correct: false, text: "Gigutom ko", audioSrc: "/cebu_gigutom.mp3" }, { challengeId: 93, correct: true, text: "Malipayon ko", audioSrc: "/cebu_malipayon.mp3" },
      // U2-L4-C4: I am sad (Guol ko)
      { challengeId: 94, correct: true, text: "Guol ko", audioSrc: "/cebu_guol.mp3" }, { challengeId: 94, correct: false, text: "Malipayon ko", audioSrc: "/cebu_malipayon.mp3" }, { challengeId: 94, correct: false, text: "Gikapoy ko", audioSrc: "/cebu_gikapoy.mp3" },
      // U2-L4-C5: Are you tired? (Gikapoy ka ba?)
      { challengeId: 95, correct: false, text: "Isog ka ba?", audioSrc: "/cebu_isog.mp3" }, { challengeId: 95, correct: true, text: "Gikapoy ka ba?", audioSrc: "/cebu_gikapoy.mp3" }, { challengeId: 95, correct: false, text: "Gigutom ka ba?", audioSrc: "/cebu_gigutom.mp3" },
      // U2-L5-C1: Excuse me (Tabi / Makikiraan)
      { challengeId: 96, correct: false, text: "Aalis na ko", audioSrc: "/cebu_aalis.mp3" }, { challengeId: 96, correct: true, text: "Tabi / Makikiraan", audioSrc: "/cebu_tabi.mp3" }, { challengeId: 96, correct: false, text: "Dito lang ko", audioSrc: "/cebu_dito.mp3" },
      // U2-L5-C2: I don't know (Ambot)
      { challengeId: 97, correct: false, text: "Kabalo ko", audioSrc: "/cebu_kabalo.mp3" }, { challengeId: 97, correct: false, text: "Nakalimot ko", audioSrc: "/cebu_nakalimot.mp3" }, { challengeId: 97, correct: true, text: "Ambot", audioSrc: "/cebu_ambot.mp3" },
      // U2-L5-C3: Thank you very much (Salamat kaayo)
      { challengeId: 98, correct: true, text: "Salamat kaayo", audioSrc: "/cebu_salamatkaayo.mp3" }, { challengeId: 98, correct: false, text: "Walay sapayan", audioSrc: "/cebu_walaysapayan.mp3" }, { challengeId: 98, correct: false, text: "Pasensya na", audioSrc: "/cebu_pasensya.mp3" },
      // U2-L5-C4: You're welcome (Walay sapayan)
      { challengeId: 99, correct: false, text: "Salamat", audioSrc: "/cebu_salamat.mp3" }, { challengeId: 99, correct: true, text: "Walay sapayan", audioSrc: "/cebu_walaysapayan.mp3" }, { challengeId: 99, correct: false, text: "Way problema", audioSrc: "/cebu_wayproblema.mp3" },
      // U2-L5-C5: Let's eat (Mangaon na ta)
      { challengeId: 100, correct: false, text: "Manglakaw na ta", audioSrc: "/cebu_manglakaw.mp3" }, { challengeId: 100, correct: false, text: "Matulog na ta", audioSrc: "/cebu_matulog.mp3" }, { challengeId: 100, correct: true, text: "Mangaon na ta", audioSrc: "/cebu_mangaon.mp3" },

      // ============================================
      // HILIGAYNON OPTIONS (101-125) - Existing shuffled content
      // ============================================
      // (Content unchanged, using previous option IDs 301-375)
      // U1-L1-C1: Father (Tatay)
      { challengeId: 101, correct: false, text: "Nanay", audioSrc: "/hil_nanay.mp3" }, { challengeId: 101, correct: true, text: "Tatay", audioSrc: "/hil_tatay.mp3" }, { challengeId: 101, correct: false, text: "Manong", audioSrc: "/hil_manong.mp3" },
      // U1-L1-C2: Mother (Nanay)
      { challengeId: 102, correct: true, text: "Nanay", audioSrc: "/hil_nanay.mp3" }, { challengeId: 102, correct: false, text: "Tatay", audioSrc: "/hil_tatay.mp3" }, { challengeId: 102, correct: false, text: "Manang", audioSrc: "/hil_manang.mp3" },
      // U1-L1-C3: Older Brother (Manong)
      { challengeId: 103, correct: false, text: "Inday", audioSrc: "/hil_inday.mp3" }, { challengeId: 103, correct: true, text: "Manong", audioSrc: "/hil_manong.mp3" }, { challengeId: 103, correct: false, text: "Lolo", audioSrc: "/hil_lolo.mp3" },
      // U1-L1-C4: Older Sister (Manang)
      { challengeId: 104, correct: false, text: "Manong", audioSrc: "/hil_manong.mp3" }, { challengeId: 104, correct: false, text: "Nong", audioSrc: "/hil_nong.mp3" }, { challengeId: 104, correct: true, text: "Manang", audioSrc: "/hil_manang.mp3" },
      // U1-L1-C5: Grandfather (Lolo)
      { challengeId: 105, correct: false, text: "Lola", audioSrc: "/hil_lola.mp3" }, { challengeId: 105, correct: true, text: "Lolo", audioSrc: "/hil_lolo.mp3" }, { challengeId: 105, correct: false, text: "Tita", audioSrc: "/hil_tita.mp3" },
      // U1-L2-C1: Eat (Kaon)
      { challengeId: 106, correct: false, text: "Imo", audioSrc: "/hil_imo.mp3" }, { challengeId: 106, correct: true, text: "Kaon", audioSrc: "/hil_kaon.mp3" }, { challengeId: 106, correct: false, text: "Tulog", audioSrc: "/hil_tulog.mp3" },
      // U1-L2-C2: Drink (Inom)
      { challengeId: 107, correct: true, text: "Inom", audioSrc: "/hil_inom.mp3" }, { challengeId: 107, correct: false, text: "Kaon", audioSrc: "/hil_kaon.mp3" }, { challengeId: 107, correct: false, text: "Lakat", audioSrc: "/hil_lakat.mp3" },
      // U1-L2-C3: Sleep (Tulog)
      { challengeId: 108, correct: false, text: "Bangon", audioSrc: "/hil_bangon.mp3" }, { challengeId: 108, correct: true, text: "Tulog", audioSrc: "/hil_tulog.mp3" }, { challengeId: 108, correct: false, text: "Basa", audioSrc: "/hil_basa.mp3" },
      // U1-L2-C4: Walk (Lakat)
      { challengeId: 109, correct: false, text: "Pungko", audioSrc: "/hil_pungko.mp3" }, { challengeId: 109, correct: true, text: "Lakat", audioSrc: "/hil_lakat.mp3" }, { challengeId: 109, correct: false, text: "Dagan", audioSrc: "/hil_dagan.mp3" },
      // U1-L2-C5: Read (Basa)
      { challengeId: 110, correct: false, text: "Sulat", audioSrc: "/hil_sulat.mp3" }, { challengeId: 110, correct: true, text: "Basa", audioSrc: "/hil_basa.mp3" }, { challengeId: 110, correct: false, text: "Hambal", audioSrc: "/hil_hambal.mp3" },
      // U1-L3-C1: Beautiful (Matahum)
      { challengeId: 111, correct: false, text: "Malain", audioSrc: "/hil_malain.mp3" }, { challengeId: 111, correct: true, text: "Matahum", audioSrc: "/hil_matahum.mp3" }, { challengeId: 111, correct: false, text: "Gamay", audioSrc: "/hil_gamay.mp3" },
      // U1-L3-C2: Big (Dako)
      { challengeId: 112, correct: true, text: "Dako", audioSrc: "/hil_dako.mp3" }, { challengeId: 112, correct: false, text: "Gamay", audioSrc: "/hil_gamay.mp3" }, { challengeId: 112, correct: false, text: "Init", audioSrc: "/hil_init.mp3" },
      // U1-L3-C3: Happy (Malipayon)
      { challengeId: 113, correct: false, text: "Masubo", audioSrc: "/hil_masubo.mp3" }, { challengeId: 113, correct: false, text: "Gutom", audioSrc: "/hil_gutom.mp3" }, { challengeId: 113, correct: true, text: "Malipayon", audioSrc: "/hil_malipayon.mp3" },
      // U1-L3-C4: Delicious (Manamit)
      { challengeId: 114, correct: false, text: "Mapait", audioSrc: "/hil_mapait.mp3" }, { challengeId: 114, correct: true, text: "Manamit", audioSrc: "/hil_manamit.mp3" }, { challengeId: 114, correct: false, text: "Maasin", audioSrc: "/hil_maasin.mp3" },
      // U1-L3-C5: Hot (Mainit)
      { challengeId: 115, correct: false, text: "Mabugnaw", audioSrc: "/hil_mabugnaw.mp3" }, { challengeId: 115, correct: true, text: "Mainit", audioSrc: "/hil_mainit.mp3" }, { challengeId: 115, correct: false, text: "Mabaskog", audioSrc: "/hil_mabaskog.mp3" },
      // U1-L4-C1: Rice (Kan-on)
      { challengeId: 116, correct: true, text: "Kan-on", audioSrc: "/hil_kanon.mp3" }, { challengeId: 116, correct: false, text: "Tubig", audioSrc: "/hil_tubig.mp3" }, { challengeId: 116, correct: false, text: "Isda", audioSrc: "/hil_isda.mp3" },
      // U1-L4-C2: Water (Tubig)
      { challengeId: 117, correct: false, text: "Kape", audioSrc: "/hil_kape.mp3" }, { challengeId: 117, correct: true, text: "Tubig", audioSrc: "/hil_tubig.mp3" }, { challengeId: 117, correct: false, text: "Gatas", audioSrc: "/hil_gatas.mp3" },
      // U1-L4-C3: Bread (Tinapay)
      { challengeId: 118, correct: false, text: "Manok", audioSrc: "/hil_manok.mp3" }, { challengeId: 118, correct: true, text: "Tinapay", audioSrc: "/hil_tinapay.mp3" }, { challengeId: 118, correct: false, text: "Baka", audioSrc: "/hil_baka.mp3" },
      // U1-L4-C4: Fish (Isda)
      { challengeId: 119, correct: true, text: "Isda", audioSrc: "/hil_isda.mp3" }, { challengeId: 119, correct: false, text: "Baboy", audioSrc: "/hil_baboy.mp3" }, { challengeId: 119, correct: false, text: "Itlog", audioSrc: "/hil_itlog.mp3" },
      // U1-L4-C5: Chicken (Manok)
      { challengeId: 120, correct: false, text: "Gulay", audioSrc: "/hil_gulay.mp3" }, { challengeId: 120, correct: true, text: "Manok", audioSrc: "/hil_manok.mp3" }, { challengeId: 120, correct: false, text: "Karne", audioSrc: "/hil_karne.mp3" },
      // U1-L5-C1: Yes (Huo)
      { challengeId: 121, correct: false, text: "Indi", audioSrc: "/hil_indi.mp3" }, { challengeId: 121, correct: true, text: "Huo", audioSrc: "/hil_huo.mp3" }, { challengeId: 121, correct: false, text: "Wala", audioSrc: "/hil_wala.mp3" },
      // U1-L5-C2: No (Indi)
      { challengeId: 122, correct: true, text: "Indi", audioSrc: "/hil_indi.mp3" }, { challengeId: 122, correct: false, text: "Huo", audioSrc: "/hil_huo.mp3" }, { challengeId: 122, correct: false, text: "Amo", audioSrc: "/hil_amo.mp3" },
      // U1-L5-C3: Thank you (Salamat)
      { challengeId: 123, correct: false, text: "Paalam", audioSrc: "/hil_paalam.mp3" }, { challengeId: 123, correct: true, text: "Salamat", audioSrc: "/hil_salamat.mp3" }, { challengeId: 123, correct: false, text: "Kumusta", audioSrc: "/hil_kumusta.mp3" },
      // U1-L5-C4: Good morning (Maayong aga)
      { challengeId: 124, correct: false, text: "Maayong gab-i", audioSrc: "/hil_gab-i.mp3" }, { challengeId: 124, correct: true, text: "Maayong aga", audioSrc: "/hil_aga.mp3" }, { challengeId: 124, correct: false, text: "Maayong hapon", audioSrc: "/hil_hapon.mp3" },
      // U1-L5-C5: Goodbye (Asta sa liwat)
      { challengeId: 125, correct: false, text: "Salamat", audioSrc: "/hil_salamat.mp3" }, { challengeId: 125, correct: true, text: "Asta sa liwat", audioSrc: "/hil_astaliwat.mp3" }, { challengeId: 125, correct: false, text: "Palangga ta ka", audioSrc: "/hil_palanggataka.mp3" },

      // ============================================
      // ILOCANO OPTIONS (126-150) - Existing shuffled content
      // ============================================
      // (Content unchanged, using previous option IDs 376-450)
      // U1-L1-C1: Father (Tatáng)
      { challengeId: 126, correct: false, text: "Nanáng", audioSrc: "/ilo_nanang.mp3" }, { challengeId: 126, correct: false, text: "Manong", audioSrc: "/ilo_manong.mp3" }, { challengeId: 126, correct: true, text: "Tatáng", audioSrc: "/ilo_tatang.mp3" },
      // U1-L1-C2: Mother (Nanáng)
      { challengeId: 127, correct: true, text: "Nanáng", audioSrc: "/ilo_nanang.mp3" }, { challengeId: 127, correct: false, text: "Tatáng", audioSrc: "/ilo_tatang.mp3" }, { challengeId: 127, correct: false, text: "Manang", audioSrc: "/ilo_manang.mp3" },
      // U1-L1-C3: Older Brother (Manong)
      { challengeId: 128, correct: true, text: "Manong", audioSrc: "/ilo_manong.mp3" }, { challengeId: 128, correct: false, text: "Manang", audioSrc: "/ilo_manang.mp3" }, { challengeId: 128, correct: false, text: "Lelong", audioSrc: "/ilo_lelong.mp3" },
      // U1-L1-C4: Older Sister (Manang)
      { challengeId: 129, correct: false, text: "Manong", audioSrc: "/ilo_manong.mp3" }, { challengeId: 129, correct: true, text: "Manang", audioSrc: "/ilo_manang.mp3" }, { challengeId: 129, correct: false, text: "Adí", audioSrc: "/ilo_adi.mp3" },
      // U1-L1-C5: Grandfather (Lelong)
      { challengeId: 130, correct: false, text: "Leláng", audioSrc: "/ilo_lelang.mp3" }, { challengeId: 130, correct: true, text: "Lelong", audioSrc: "/ilo_lelong.mp3" }, { challengeId: 130, correct: false, text: "Adíng", audioSrc: "/ilo_ading.mp3" },
      // U1-L2-C1: Eat (Mangan)
      { challengeId: 131, correct: false, text: "Uminom", audioSrc: "/ilo_uminom.mp3" }, { challengeId: 131, correct: false, text: "Maturog", audioSrc: "/ilo_maturog.mp3" }, { challengeId: 131, correct: true, text: "Mangan", audioSrc: "/ilo_mangan.mp3" },
      // U1-L2-C2: Drink (Uminom)
      { challengeId: 132, correct: true, text: "Uminom", audioSrc: "/ilo_uminom.mp3" }, { challengeId: 132, correct: false, text: "Mangan", audioSrc: "/ilo_mangan.mp3" }, { challengeId: 132, correct: false, text: "Magnana", audioSrc: "/ilo_magnana.mp3" },
      // U1-L2-C3: Sleep (Maturog)
      { challengeId: 133, correct: false, text: "Bumangon", audioSrc: "/ilo_bumangon.mp3" }, { challengeId: 133, correct: true, text: "Maturog", audioSrc: "/ilo_maturog.mp3" }, { challengeId: 133, correct: false, text: "Magna", audioSrc: "/ilo_magna.mp3" },
      // U1-L2-C4: Walk (Magna)
      { challengeId: 134, correct: false, text: "Sitá", audioSrc: "/ilo_sita.mp3" }, { challengeId: 134, correct: true, text: "Magna", audioSrc: "/ilo_magna.mp3" }, { challengeId: 134, correct: false, text: "Kíta", audioSrc: "/ilo_kita.mp3" },
      // U1-L2-C5: Read (Agbasá)
      { challengeId: 135, correct: false, text: "Agsúrat", audioSrc: "/ilo_agsurat.mp3" }, { challengeId: 135, correct: true, text: "Agbasá", audioSrc: "/ilo_agbasa.mp3" }, { challengeId: 135, correct: false, text: "Agdalús", audioSrc: "/ilo_agdalus.mp3" },
      // U1-L3-C1: Beautiful (Naláwá)
      { challengeId: 136, correct: false, text: "Náken", audioSrc: "/ilo_naken.mp3" }, { challengeId: 136, correct: true, text: "Naláwá", audioSrc: "/ilo_nalawa.mp3" }, { challengeId: 136, correct: false, text: "Bassít", audioSrc: "/ilo_bassit.mp3" },
      // U1-L3-C2: Big (Naláwa)
      { challengeId: 137, correct: true, text: "Naláwa", audioSrc: "/ilo_nalawa.mp3" }, { challengeId: 137, correct: false, text: "Bassít", audioSrc: "/ilo_bassit.mp3" }, { challengeId: 137, correct: false, text: "Napúdaw", audioSrc: "/ilo_napudaw.mp3" },
      // U1-L3-C3: Happy (Naragsák)
      { challengeId: 138, correct: false, text: "Nalungtót", audioSrc: "/ilo_nalungtot.mp3" }, { challengeId: 138, correct: true, text: "Naragsák", audioSrc: "/ilo_naragsak.mp3" }, { challengeId: 138, correct: false, text: "Agum", audioSrc: "/ilo_agum.mp3" },
      // U1-L3-C4: Delicious (Naímas)
      { challengeId: 139, correct: false, text: "Napait", audioSrc: "/ilo_napait.mp3" }, { challengeId: 139, correct: true, text: "Naímas", audioSrc: "/ilo_naimas.mp3" }, { challengeId: 139, correct: false, text: "Naasín", audioSrc: "/ilo_naasin.mp3" },
      // U1-L3-C5: Hot (Napúdot)
      { challengeId: 140, correct: false, text: "Nalam-ék", audioSrc: "/ilo_nalamek.mp3" }, { challengeId: 140, correct: true, text: "Napúdot", audioSrc: "/ilo_napudot.mp3" }, { challengeId: 140, correct: false, text: "Nadákel", audioSrc: "/ilo_nadakel.mp3" },
      // U1-L4-C1: Rice (Bagás)
      { challengeId: 141, correct: false, text: "Danúm", audioSrc: "/ilo_danum.mp3" }, { challengeId: 141, correct: true, text: "Bagás", audioSrc: "/ilo_bagas.mp3" }, { challengeId: 141, correct: false, text: "Pásao", audioSrc: "/ilo_pasao.mp3" },
      // U1-L4-C2: Water (Danúm)
      { challengeId: 142, correct: true, text: "Danúm", audioSrc: "/ilo_danum.mp3" }, { challengeId: 142, correct: false, text: "Kape", audioSrc: "/ilo_kape.mp3" }, { challengeId: 142, correct: false, text: "Gátas", audioSrc: "/ilo_gatas.mp3" },
      // U1-L4-C3: Bread (Tinápay)
      { challengeId: 143, correct: false, text: "Ílog", audioSrc: "/ilo_ilog.mp3" }, { challengeId: 143, correct: true, text: "Tinápay", audioSrc: "/ilo_tinapay.mp3" }, { challengeId: 143, correct: false, text: "Asukál", audioSrc: "/ilo_asukal.mp3" },
      // U1-L4-C4: Fish (Íkan)
      { challengeId: 144, correct: true, text: "Íkan", audioSrc: "/ilo_ikan.mp3" }, { challengeId: 144, correct: false, text: "Manók", audioSrc: "/ilo_manok.mp3" }, { challengeId: 144, correct: false, text: "Bábuy", audioSrc: "/ilo_babuy.mp3" },
      // U1-L4-C5: Chicken (Manók)
      { challengeId: 145, correct: false, text: "Báka", audioSrc: "/ilo_baka.mp3" }, { challengeId: 145, correct: true, text: "Manók", audioSrc: "/ilo_manok.mp3" }, { challengeId: 145, correct: false, text: "Naténg", audioSrc: "/ilo_nateng.mp3" },
      // U1-L5-C1: Yes (Wen)
      { challengeId: 146, correct: false, text: "Haan", audioSrc: "/ilo_haan.mp3" }, { challengeId: 146, correct: true, text: "Wen", audioSrc: "/ilo_wen.mp3" }, { challengeId: 146, correct: false, text: "Awan", audioSrc: "/ilo_awan.mp3" },
      // U1-L5-C2: No (Haan)
      { challengeId: 147, correct: false, text: "Wen", audioSrc: "/ilo_wen.mp3" }, { challengeId: 147, correct: true, text: "Haan", audioSrc: "/ilo_haan.mp3" }, { challengeId: 147, correct: false, text: "Adú", audioSrc: "/ilo_adu.mp3" },
      // U1-L5-C3: Thank you (Agyámanak)
      { challengeId: 148, correct: true, text: "Agyámanak", audioSrc: "/ilo_agyamanak.mp3" }, { challengeId: 148, correct: false, text: "Púlaw", audioSrc: "/ilo_pulaw.mp3" }, { challengeId: 148, correct: false, text: "Kumusta", audioSrc: "/ilo_kumusta.mp3" },
      // U1-L5-C4: Good morning (Naimbag a bigát)
      { challengeId: 149, correct: false, text: "Naimbag a rabíi", audioSrc: "/ilo_rabii.mp3" }, { challengeId: 149, correct: false, text: "Naimbag a malém", audioSrc: "/ilo_malem.mp3" }, { challengeId: 149, correct: true, text: "Naimbag a bigát", audioSrc: "/ilo_bigat.mp3" },
      // U1-L5-C5: Goodbye (Inkáman)
      { challengeId: 150, correct: false, text: "Agyámanak", audioSrc: "/ilo_agyamanak.mp3" }, { challengeId: 150, correct: true, text: "Inkáman", audioSrc: "/ilo_inkaman.mp3" }, { challengeId: 150, correct: false, text: "Ay-ayátanka", audioSrc: "/ilo_ayayataka.mp3" },
      
      // ============================================
      // PANGASINAN OPTIONS (151-175) - Existing shuffled content
      // ============================================
      // (Content unchanged, using previous option IDs 451-525)
      // U1-L1-C1: Father (Ama)
      { challengeId: 151, correct: false, text: "Ima", audioSrc: "/pan_ima.mp3" }, { challengeId: 151, correct: true, text: "Ama", audioSrc: "/pan_ama.mp3" }, { challengeId: 151, correct: false, text: "Kuyá", audioSrc: "/pan_kuya.mp3" },
      // U1-L1-C2: Mother (Ima)
      { challengeId: 152, correct: true, text: "Ima", audioSrc: "/pan_ima.mp3" }, { challengeId: 152, correct: false, text: "Ama", audioSrc: "/pan_ama.mp3" }, { challengeId: 152, correct: false, text: "Aki", audioSrc: "/pan_aki.mp3" },
      // U1-L1-C3: Older Brother (Kuyá)
      { challengeId: 153, correct: false, text: "Baliká", audioSrc: "/pan_balika.mp3" }, { challengeId: 153, correct: true, text: "Kuyá", audioSrc: "/pan_kuya.mp3" }, { challengeId: 153, correct: false, text: "Laki", audioSrc: "/pan_laki.mp3" },
      // U1-L1-C4: Older Sister (Ati)
      { challengeId: 154, correct: false, text: "Kuyá", audioSrc: "/pan_kuya.mp3" }, { challengeId: 154, correct: true, text: "Ati", audioSrc: "/pan_ati.mp3" }, { challengeId: 154, correct: false, text: "Sana", audioSrc: "/pan_sana.mp3" },
      // U1-L1-C5: Grandfather (Laki)
      { challengeId: 155, correct: false, text: "Bái", audioSrc: "/pan_bai.mp3" }, { challengeId: 155, correct: true, text: "Laki", audioSrc: "/pan_laki.mp3" }, { challengeId: 155, correct: false, text: "Tito", audioSrc: "/pan_tito.mp3" },
      // U1-L2-C1: Eat (Mangan)
      { challengeId: 156, correct: false, text: "Uminum", audioSrc: "/pan_uminum.mp3" }, { challengeId: 156, correct: true, text: "Mangan", audioSrc: "/pan_mangan.mp3" }, { challengeId: 156, correct: false, text: "Matulog", audioSrc: "/pan_matulog.mp3" },
      // U1-L2-C2: Drink (Uminum)
      { challengeId: 157, correct: false, text: "Mangan", audioSrc: "/pan_mangan.mp3" }, { challengeId: 157, correct: false, text: "Manpís", audioSrc: "/pan_manpis.mp3" }, { challengeId: 157, correct: true, text: "Uminum", audioSrc: "/pan_uminum.mp3" },
      // U1-L2-C3: Sleep (Matulog)
      { challengeId: 158, correct: true, text: "Matulog", audioSrc: "/pan_matulog.mp3" }, { challengeId: 158, correct: false, text: "Bumangon", audioSrc: "/pan_bumangon.mp3" }, { challengeId: 158, correct: false, text: "Manakar", audioSrc: "/pan_manakar.mp3" },
      // U1-L2-C4: Walk (Manakar)
      { challengeId: 159, correct: true, text: "Manakar", audioSrc: "/pan_manakar.mp3" }, { challengeId: 159, correct: false, text: "Manukol", audioSrc: "/pan_manukol.mp3" }, { challengeId: 159, correct: false, text: "Mangatawá", audioSrc: "/pan_mangatawa.mp3" },
      // U1-L2-C5: Read (Manbasa)
      { challengeId: 160, correct: false, text: "Mansúlat", audioSrc: "/pan_mansulat.mp3" }, { challengeId: 160, correct: false, text: "Manluto", audioSrc: "/pan_manluto.mp3" }, { challengeId: 160, correct: true, text: "Manbasa", audioSrc: "/pan_manbasa.mp3" },
      // U1-L3-C1: Beautiful (Malibér)
      { challengeId: 161, correct: false, text: "Mauges", audioSrc: "/pan_mauges.mp3" }, { challengeId: 161, correct: true, text: "Malibér", audioSrc: "/pan_maliber.mp3" }, { challengeId: 161, correct: false, text: "Melág", audioSrc: "/pan_melag.mp3" },
      // U1-L3-C2: Big (Balégew)
      { challengeId: 162, correct: false, text: "Melág", audioSrc: "/pan_melag.mp3" }, { challengeId: 162, correct: true, text: "Balégew", audioSrc: "/pan_balegew.mp3" }, { challengeId: 162, correct: false, text: "Mangíris", audioSrc: "/pan_mangiris.mp3" },
      // U1-L3-C3: Happy (Maliket)
      { challengeId: 163, correct: true, text: "Maliket", audioSrc: "/pan_maliket.mp3" }, { challengeId: 163, correct: false, text: "Malungét", audioSrc: "/pan_malunget.mp3" }, { challengeId: 163, correct: false, text: "Akabubén", audioSrc: "/pan_akabuben.mp3" },
      // U1-L3-C4: Delicious (Masamit)
      { challengeId: 164, correct: false, text: "Mapait", audioSrc: "/pan_mapait.mp3" }, { challengeId: 164, correct: false, text: "Maasín", audioSrc: "/pan_maasin.mp3" }, { challengeId: 164, correct: true, text: "Masamit", audioSrc: "/pan_masamit.mp3" },
      // U1-L3-C5: Hot (Maéwet)
      { challengeId: 165, correct: true, text: "Maéwet", audioSrc: "/pan_maewet.mp3" }, { challengeId: 165, correct: false, text: "Maéken", audioSrc: "/pan_maeken.mp3" }, { challengeId: 165, correct: false, text: "Mablé", audioSrc: "/pan_mable.mp3" },
      // U1-L4-C1: Rice (Bagás)
      { challengeId: 166, correct: false, text: "Siból", audioSrc: "/pan_sibol.mp3" }, { challengeId: 166, correct: true, text: "Bagás", audioSrc: "/pan_bagas.mp3" }, { challengeId: 166, correct: false, text: "Ulám", audioSrc: "/pan_ulam.mp3" },
      // U1-L4-C2: Water (Danúm)
      { challengeId: 167, correct: false, text: "Kape", audioSrc: "/pan_kape.mp3" }, { challengeId: 167, correct: true, text: "Danúm", audioSrc: "/pan_danum.mp3" }, { challengeId: 167, correct: false, text: "Gátas", audioSrc: "/pan_gatas.mp3" },
      // U1-L4-C3: Bread (Tinápay)
      { challengeId: 168, correct: true, text: "Tinápay", audioSrc: "/pan_tinapay.mp3" }, { challengeId: 168, correct: false, text: "Ílog", audioSrc: "/pan_ilog.mp3" }, { challengeId: 168, correct: false, text: "Asukál", audioSrc: "/pan_asukal.mp3" },
      // U1-L4-C4: Fish (Ísa)
      { challengeId: 169, correct: false, text: "Manók", audioSrc: "/pan_manok.mp3" }, { challengeId: 169, correct: true, text: "Ísa", audioSrc: "/pan_isa.mp3" }, { challengeId: 169, correct: false, text: "Baboy", audioSrc: "/pan_baboy.mp3" },
      // U1-L4-C5: Chicken (Manók)
      { challengeId: 170, correct: false, text: "Baka", audioSrc: "/pan_baka.mp3" }, { challengeId: 170, correct: true, text: "Manók", audioSrc: "/pan_manok.mp3" }, { challengeId: 170, correct: false, text: "Díray", audioSrc: "/pan_diray.mp3" },
      // U1-L5-C1: Yes (Óo)
      { challengeId: 171, correct: true, text: "Óo", audioSrc: "/pan_oo.mp3" }, { challengeId: 171, correct: false, text: "Agí", audioSrc: "/pan_agi.mp3" }, { challengeId: 171, correct: false, text: "Anggapó", audioSrc: "/pan_anggapo.mp3" },
      // U1-L5-C2: No (Agí)
      { challengeId: 172, correct: true, text: "Agí", audioSrc: "/pan_agi.mp3" }, { challengeId: 172, correct: false, text: "Óo", audioSrc: "/pan_oo.mp3" }, { challengeId: 172, correct: false, text: "Wala", audioSrc: "/pan_wala.mp3" },
      // U1-L5-C3: Thank you (Salamat)
      { challengeId: 173, correct: false, text: "Púlaw", audioSrc: "/pan_pulaw.mp3" }, { challengeId: 173, correct: true, text: "Salamat", audioSrc: "/pan_salamat.mp3" }, { challengeId: 173, correct: false, text: "Kumustá", audioSrc: "/pan_kumusta.mp3" },
      // U1-L5-C4: Good morning (Maústoy labí)
      { challengeId: 174, correct: false, text: "Maústoy béngat", audioSrc: "/pan_bengat.mp3" }, { challengeId: 174, correct: true, text: "Maústoy labí", audioSrc: "/pan_labi.mp3" }, { challengeId: 174, correct: false, text: "Maústoy ngarem", audioSrc: "/pan_ngarem.mp3" },
      // U1-L5-C5: Goodbye (Mántoy láyá)
      { challengeId: 175, correct: false, text: "Salamat", audioSrc: "/pan_salamat.mp3" }, { challengeId: 175, correct: true, text: "Mántoy láyá", audioSrc: "/pan_mantolaya.mp3" }, { challengeId: 175, correct: false, text: "Inaráw táka", audioSrc: "/pan_inarawtaka.mp3" },
      
      // ============================================
      // BAYBAYIN OPTIONS (176-200) - Shuffled
      // ============================================
      // U1-L1-C1: ᜀ (A)
      { challengeId: 176, correct: false, text: "E/I", audioSrc: "/bay_EI.mp3" }, { challengeId: 176, correct: true, text: "A", audioSrc: "/bay_A.mp3" }, { challengeId: 176, correct: false, text: "O/U", audioSrc: "/bay_OU.mp3" },
      // U1-L1-C2: ᜁ (E/I)
      { challengeId: 177, correct: false, text: "O/U", audioSrc: "/bay_OU.mp3" }, { challengeId: 177, correct: true, text: "E / I", audioSrc: "/bay_EI.mp3" }, { challengeId: 177, correct: false, text: "A", audioSrc: "/bay_A.mp3" },
      // U1-L1-C3: ᜂ (O/U)
      { challengeId: 178, correct: false, text: "A", audioSrc: "/bay_A.mp3" }, { challengeId: 178, correct: true, text: "O / U", audioSrc: "/bay_OU.mp3" }, { challengeId: 178, correct: false, text: "BÁ", audioSrc: "/bay_BA.mp3" },
      // U1-L1-C4: Which is "A"?
      { challengeId: 179, correct: false, text: "ᜁ", audioSrc: "/bay_EI.mp3" }, { challengeId: 179, correct: false, text: "ᜂ", audioSrc: "/bay_OU.mp3" }, { challengeId: 179, correct: true, text: "ᜀ", audioSrc: "/bay_A.mp3" },
      // U1-L1-C5: Which is "O/U"?
      { challengeId: 180, correct: false, text: "ᜀ", audioSrc: "/bay_A.mp3" }, { challengeId: 180, correct: true, text: "ᜂ", audioSrc: "/bay_OU.mp3" }, { challengeId: 180, correct: false, text: "ᜁ", audioSrc: "/bay_EI.mp3" },

      // U1-L2-C1: ᜊ (BÁ)
      { challengeId: 181, correct: false, text: "PÁ", audioSrc: "/bay_PA.mp3" }, { challengeId: 181, correct: false, text: "TÁ", audioSrc: "/bay_TA.mp3" }, { challengeId: 181, correct: true, text: "BÁ", audioSrc: "/bay_BA.mp3" },
      // U1-L2-C2: ᜊᜒ (BÍ)
      { challengeId: 182, correct: true, text: "BÉ / BÍ", audioSrc: "/bay_BI.mp3" }, { challengeId: 182, correct: false, text: "BÁ", audioSrc: "/bay_BA.mp3" }, { challengeId: 182, correct: false, text: "BÓ / BÚ", audioSrc: "/bay_BU.mp3" },
      // U1-L2-C3: ᜊᜓ (BÚ)
      { challengeId: 183, correct: false, text: "BÁ", audioSrc: "/bay_BA.mp3" }, { challengeId: 183, correct: true, text: "BÓ / BÚ", audioSrc: "/bay_BU.mp3" }, { challengeId: 183, correct: false, text: "BÉ / BÍ", audioSrc: "/bay_BI.mp3" },
      // U1-L2-C4: Which is "BÁ"?
      { challengeId: 184, correct: false, text: "ᜇ", audioSrc: "/bay_DA.mp3" }, { challengeId: 184, correct: true, text: "ᜊ", audioSrc: "/bay_BA.mp3" }, { challengeId: 184, correct: false, text: "ᜄ", audioSrc: "/bay_GA.mp3" },
      // U1-L2-C5: Which is "BI"?
      { challengeId: 185, correct: false, text: "ᜊᜓ", audioSrc: "/bay_BU.mp3" }, { challengeId: 185, correct: false, text: "ᜊ", audioSrc: "/bay_BA.mp3" }, { challengeId: 185, correct: true, text: "ᜊᜒ", audioSrc: "/bay_BI.mp3" },

      // U1-L3-C1: ᜇ (DÁ/LÁ)
      { challengeId: 186, correct: false, text: "NÁ", audioSrc: "/bay_NA.mp3" }, { challengeId: 186, correct: true, text: "DÁ / LÁ", audioSrc: "/bay_DA.mp3" }, { challengeId: 186, correct: false, text: "PÁ", audioSrc: "/bay_PA.mp3" },
      // U1-L3-C2: Which is "DÍ"?
      { challengeId: 187, correct: false, text: "ᜇ", audioSrc: "/bay_DA.mp3" }, { challengeId: 187, correct: false, text: "ᜄᜒ", audioSrc: "/bay_GI.mp3" }, { challengeId: 187, correct: true, text: "ᜇᜒ", audioSrc: "/bay_DI.mp3" },
      // U1-L3-C3: ᜇᜓ (DÚ/LÚ)
      { challengeId: 188, correct: true, text: "DÓ / LÚ", audioSrc: "/bay_DU.mp3" }, { challengeId: 188, correct: false, text: "DÁ / LÁ", audioSrc: "/bay_DA.mp3" }, { challengeId: 188, correct: false, text: "DÉ / LÍ", audioSrc: "/bay_DI.mp3" },
      // U1-L3-C4: Which is "LÁ"?
      { challengeId: 189, correct: true, text: "ᜇ", audioSrc: "/bay_DA.mp3" }, { challengeId: 189, correct: false, text: "ᜉ", audioSrc: "/bay_PA.mp3" }, { challengeId: 189, correct: false, text: "ᜌ", audioSrc: "/bay_YA.mp3" },
      // U1-L3-C5: Which is "DO"?
      { challengeId: 190, correct: false, text: "ᜇ", audioSrc: "/bay_DA.mp3" }, { challengeId: 190, correct: false, text: "ᜎᜒ", audioSrc: "/bay_LI.mp3" }, { challengeId: 190, correct: true, text: "ᜇᜓ", audioSrc: "/bay_DU.mp3" },

      // U1-L4-C1: Which is "GÍ"?
      { challengeId: 191, correct: false, text: "ᜄᜓ", audioSrc: "/bay_GU.mp3" }, { challengeId: 191, correct: false, text: "ᜇᜒ", audioSrc: "/bay_DI.mp3" }, { challengeId: 191, correct: true, text: "ᜄᜒ", audioSrc: "/bay_GI.mp3" },
      // U1-L4-C2: ᜄ (GÁ)
      { challengeId: 192, correct: false, text: "KÁ", audioSrc: "/bay_KA.mp3" }, { challengeId: 192, correct: true, text: "GÁ", audioSrc: "/bay_GA.mp3" }, { challengeId: 192, correct: false, text: "TÁ", audioSrc: "/bay_TA.mp3" },
      // U1-L4-C3: Which is "GU"?
      { challengeId: 193, correct: false, text: "ᜄ", audioSrc: "/bay_GA.mp3" }, { challengeId: 193, correct: false, text: "ᜇᜓ", audioSrc: "/bay_DU.mp3" }, { challengeId: 193, correct: true, text: "ᜄᜓ", audioSrc: "/bay_GU.mp3" },
      // U1-L4-C4: ᜄᜒ (GÍ)
      { challengeId: 194, correct: false, text: "GÓ / GÚ", audioSrc: "/bay_GU.mp3" }, { challengeId: 194, correct: true, text: "GÉ / GÍ", audioSrc: "/bay_GI.mp3" }, { challengeId: 194, correct: false, text: "GÁ", audioSrc: "/bay_GA.mp3" },
      // U1-L4-C5: Which is "GÓ"?
      { challengeId: 195, correct: false, text: "ᜃᜓ", audioSrc: "/bay_KU.mp3" }, { challengeId: 195, correct: false, text: "ᜑᜓ", audioSrc: "/bay_HU.mp3" }, { challengeId: 195, correct: true, text: "ᜄᜓ", audioSrc: "/bay_GU.mp3" },

      // U1-L5-C1: ᜊᜆ᜔ (BAT)
      { challengeId: 196, correct: false, text: "BATA", audioSrc: "/ph_bata.mp3" }, { challengeId: 196, correct: true, text: "BAT", audioSrc: "/bay_bat.mp3" }, { challengeId: 196, correct: false, text: "BATI", audioSrc: "/ph_bati.mp3" },
      // U1-L5-C2: Which is "IBON"?
      { challengeId: 197, correct: false, text: "ᜁᜊᜒᜈ", audioSrc: "/bay_ibina.mp3" }, { challengeId: 197, correct: true, text: "ᜁᜊᜓᜈ᜔", audioSrc: "/bay_ibon.mp3" }, { challengeId: 197, correct: false, text: "ᜀᜊᜓᜈ᜔", audioSrc: "/bay_abon.mp3" },
      // U1-L5-C3: ᜀᜆ᜔ (AT)
      { challengeId: 198, correct: false, text: "ATA", audioSrc: "/ph_ata.mp3" }, { challengeId: 198, correct: true, text: "AT", audioSrc: "/bay_at.mp3" }, { challengeId: 198, correct: false, text: "ATI", audioSrc: "/ph_ati.mp3" },
      // U1-L5-C4: Which is final "K"?
      { challengeId: 199, correct: false, text: "ᜃ", audioSrc: "/bay_KA.mp3" }, { challengeId: 199, correct: true, text: "ᜃ᜔", audioSrc: "/bay_K.mp3" }, { challengeId: 199, correct: false, text: "ᜃᜒ", audioSrc: "/bay_KI.mp3" },
      // U1-L5-C5: ᜆ᜔ (T)
      { challengeId: 200, correct: false, text: "TÁ", audioSrc: "/bay_TA.mp3" }, { challengeId: 200, correct: false, text: "TÍ", audioSrc: "/bay_TI.mp3" }, { challengeId: 200, correct: true, text: "T", audioSrc: "/bay_T.mp3" },
    ]);

    console.log("Seeding finished.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();