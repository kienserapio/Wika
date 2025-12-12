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
    ]);

    // 3. Insert Lessons
    await db.insert(schema.lessons).values([
      // --- Filipino Unit 1 ---
      { id: 1, unitId: 1, order: 1, title: "Family Members" },
      { id: 2, unitId: 1, order: 2, title: "Basic Actions" },
      { id: 3, unitId: 1, order: 3, title: "Describing Things" },
      { id: 4, unitId: 1, order: 4, title: "Food & Drink" },
      { id: 5, unitId: 1, order: 5, title: "Greetings" },
      // --- Filipino Unit 2 ---
      { id: 6, unitId: 2, order: 1, title: "Greetings & Time" },
      { id: 7, unitId: 2, order: 2, title: "Introductions" },
      { id: 8, unitId: 2, order: 3, title: "Wants & Likes" },
      { id: 9, unitId: 2, order: 4, title: "Emotions" },
      { id: 10, unitId: 2, order: 5, title: "Politeness" },
      // --- Cebuano Unit 1 ---
      { id: 11, unitId: 3, order: 1, title: "Family Members" },
      { id: 12, unitId: 3, order: 2, title: "Basic Actions" },
      { id: 13, unitId: 3, order: 3, title: "Describing Things" },
      { id: 14, unitId: 3, order: 4, title: "Food & Drink" },
      { id: 15, unitId: 3, order: 5, title: "Greetings" },
      // --- Cebuano Unit 2 ---
      { id: 16, unitId: 4, order: 1, title: "Greetings & Time" },
      { id: 17, unitId: 4, order: 2, title: "Introductions" },
      { id: 18, unitId: 4, order: 3, title: "Wants & Likes" },
      { id: 19, unitId: 4, order: 4, title: "Emotions" },
      { id: 20, unitId: 4, order: 5, title: "Politeness" },
    ]);

    // 4. Insert Challenges
    await db.insert(schema.challenges).values([
      // ============================================
      // FILIPINO CHALLENGES (1-50)
      // ============================================
      
      // U1-L1 (Family)
      { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'How do you say "Father"?' },
      { id: 2, lessonId: 1, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' },
      { id: 4, lessonId: 1, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 5, lessonId: 1, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' },
      
      // U1-L2 (Actions)
      { id: 6, lessonId: 2, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 7, lessonId: 2, type: "SELECT", order: 2, question: 'How do you say "To drink"?' },
      { id: 8, lessonId: 2, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 9, lessonId: 2, type: "SELECT", order: 4, question: 'How do you say "To walk"?' },
      { id: 10, lessonId: 2, type: "SELECT", order: 5, question: 'How do you say "To read"?' },

      // U1-L3 (Adjectives)
      { id: 11, lessonId: 3, type: "SELECT", order: 1, question: 'How do you say "Beautiful"?' },
      { id: 12, lessonId: 3, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 13, lessonId: 3, type: "SELECT", order: 3, question: 'How do you say "Happy"?' },
      { id: 14, lessonId: 3, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 15, lessonId: 3, type: "SELECT", order: 5, question: 'How do you say "Hot"?' },

      // U1-L4 (Food)
      { id: 16, lessonId: 4, type: "SELECT", order: 1, question: 'How do you say "Rice"?' },
      { id: 17, lessonId: 4, type: "SELECT", order: 2, question: 'How do you say "Water"?' },
      { id: 18, lessonId: 4, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 19, lessonId: 4, type: "SELECT", order: 4, question: 'How do you say "Fish"?' },
      { id: 20, lessonId: 4, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },

      // U1-L5 (Greetings)
      { id: 21, lessonId: 5, type: "SELECT", order: 1, question: 'How do you say "Yes"?' },
      { id: 22, lessonId: 5, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 23, lessonId: 5, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' },
      { id: 24, lessonId: 5, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 25, lessonId: 5, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' },

      // U2-L1 (Greetings & Time)
      { id: 26, lessonId: 6, type: "SELECT", order: 1, question: 'How do you say "Good afternoon"?' },
      { id: 27, lessonId: 6, type: "SELECT", order: 2, question: 'How do you say "Good evening"?' },
      { id: 28, lessonId: 6, type: "SELECT", order: 3, question: 'How do you say "How are you?"' },
      { id: 29, lessonId: 6, type: "SELECT", order: 4, question: 'How do you say "I am fine"?' },
      { id: 30, lessonId: 6, type: "SELECT", order: 5, question: 'How do you say "Take care"?' },

      // U2-L2 (Introductions)
      { id: 31, lessonId: 7, type: "SELECT", order: 1, question: 'How do you say "What is your name?"' },
      { id: 32, lessonId: 7, type: "SELECT", order: 2, question: 'How do you say "My name is..."?' },
      { id: 33, lessonId: 7, type: "SELECT", order: 3, question: 'How do you say "I am Filipino"?' },
      { id: 34, lessonId: 7, type: "SELECT", order: 4, question: 'How do you say "Who are you?"' },
      { id: 35, lessonId: 7, type: "SELECT", order: 5, question: 'How do you say "Are you American?"' },

      // U2-L3 (Wants/Likes)
      { id: 36, lessonId: 8, type: "SELECT", order: 1, question: 'How do you say "I like this"?' },
      { id: 37, lessonId: 8, type: "SELECT", order: 2, question: 'How do you say "I don\'t like this"?' },
      { id: 38, lessonId: 8, type: "SELECT", order: 3, question: 'How do you say "I want to eat"?' },
      { id: 39, lessonId: 8, type: "SELECT", order: 4, question: 'How do you say "Do you like rice?"' },
      { id: 40, lessonId: 8, type: "SELECT", order: 5, question: 'How do you say "I want water"?' },

      // U2-L4 (Emotions)
      { id: 41, lessonId: 9, type: "SELECT", order: 1, question: 'How do you say "I love you"?' },
      { id: 42, lessonId: 9, type: "SELECT", order: 2, question: 'How do you say "I miss you"?' },
      { id: 43, lessonId: 9, type: "SELECT", order: 3, question: 'How do you say "I am happy"?' },
      { id: 44, lessonId: 9, type: "SELECT", order: 4, question: 'How do you say "I am sad"?' },
      { id: 45, lessonId: 9, type: "SELECT", order: 5, question: 'How do you say "Are you tired?"' },

      // U2-L5 (Politeness)
      { id: 46, lessonId: 10, type: "SELECT", order: 1, question: 'How do you say "Yes" (Polite)?' },
      { id: 47, lessonId: 10, type: "SELECT", order: 2, question: 'How do you say "No" (Polite)?' },
      { id: 48, lessonId: 10, type: "SELECT", order: 3, question: 'How do you say "Thank you" (Polite)?' },
      { id: 49, lessonId: 10, type: "SELECT", order: 4, question: 'How do you say "Excuse me" (Polite)?' },
      { id: 50, lessonId: 10, type: "SELECT", order: 5, question: 'How do you say "I don\'t know" (Polite)?' },

      // ============================================
      // CEBUANO CHALLENGES (51-100)
      // ============================================

      // U1-L1 (Family) - Lesson ID 11
      { id: 51, lessonId: 11, type: "SELECT", order: 1, question: 'How do you say "Father"?' },
      { id: 52, lessonId: 11, type: "SELECT", order: 2, question: 'How do you say "Mother"?' },
      { id: 53, lessonId: 11, type: "SELECT", order: 3, question: 'How do you say "Older Brother"?' },
      { id: 54, lessonId: 11, type: "SELECT", order: 4, question: 'How do you say "Older Sister"?' },
      { id: 55, lessonId: 11, type: "SELECT", order: 5, question: 'How do you say "Grandfather"?' },

      // U1-L2 (Actions) - Lesson ID 12
      { id: 56, lessonId: 12, type: "SELECT", order: 1, question: 'How do you say "To eat"?' },
      { id: 57, lessonId: 12, type: "SELECT", order: 2, question: 'How do you say "To drink"?' },
      { id: 58, lessonId: 12, type: "SELECT", order: 3, question: 'How do you say "To sleep"?' },
      { id: 59, lessonId: 12, type: "SELECT", order: 4, question: 'How do you say "To walk"?' },
      { id: 60, lessonId: 12, type: "SELECT", order: 5, question: 'How do you say "To read"?' },

      // U1-L3 (Adjectives) - Lesson ID 13
      { id: 61, lessonId: 13, type: "SELECT", order: 1, question: 'How do you say "Beautiful" (for a person)?' },
      { id: 62, lessonId: 13, type: "SELECT", order: 2, question: 'How do you say "Big"?' },
      { id: 63, lessonId: 13, type: "SELECT", order: 3, question: 'How do you say "Happy"?' },
      { id: 64, lessonId: 13, type: "SELECT", order: 4, question: 'How do you say "Delicious"?' },
      { id: 65, lessonId: 13, type: "SELECT", order: 5, question: 'How do you say "Hot"?' },

      // U1-L4 (Food) - Lesson ID 14
      { id: 66, lessonId: 14, type: "SELECT", order: 1, question: 'How do you say "Rice" (Cooked)?' },
      { id: 67, lessonId: 14, type: "SELECT", order: 2, question: 'How do you say "Water"?' },
      { id: 68, lessonId: 14, type: "SELECT", order: 3, question: 'How do you say "Bread"?' },
      { id: 69, lessonId: 14, type: "SELECT", order: 4, question: 'How do you say "Fish"?' },
      { id: 70, lessonId: 14, type: "SELECT", order: 5, question: 'How do you say "Chicken"?' },

      // U1-L5 (Greetings) - Lesson ID 15
      { id: 71, lessonId: 15, type: "SELECT", order: 1, question: 'How do you say "Yes"?' },
      { id: 72, lessonId: 15, type: "SELECT", order: 2, question: 'How do you say "No"?' },
      { id: 73, lessonId: 15, type: "SELECT", order: 3, question: 'How do you say "Thank you"?' },
      { id: 74, lessonId: 15, type: "SELECT", order: 4, question: 'How do you say "Good morning"?' },
      { id: 75, lessonId: 15, type: "SELECT", order: 5, question: 'How do you say "Goodbye"?' },

      // U2-L1 (Greetings & Time) - Lesson ID 16
      { id: 76, lessonId: 16, type: "SELECT", order: 1, question: 'How do you say "Good afternoon"?' },
      { id: 77, lessonId: 16, type: "SELECT", order: 2, question: 'How do you say "Good evening"?' },
      { id: 78, lessonId: 16, type: "SELECT", order: 3, question: 'How do you say "How are you?"' },
      { id: 79, lessonId: 16, type: "SELECT", order: 4, question: 'How do you say "I am fine"?' },
      { id: 80, lessonId: 16, type: "SELECT", order: 5, question: 'How do you say "Take care"?' },

      // U2-L2 (Introductions) - Lesson ID 17
      { id: 81, lessonId: 17, type: "SELECT", order: 1, question: 'How do you say "What is your name?"' },
      { id: 82, lessonId: 17, type: "SELECT", order: 2, question: 'How do you say "My name is..."?' },
      { id: 83, lessonId: 17, type: "SELECT", order: 3, question: 'How do you say "I am Filipino"?' },
      { id: 84, lessonId: 17, type: "SELECT", order: 4, question: 'How do you say "Who are you?"' },
      { id: 85, lessonId: 17, type: "SELECT", order: 5, question: 'How do you say "Are you American?"' },

      // U2-L3 (Wants/Likes) - Lesson ID 18
      { id: 86, lessonId: 18, type: "SELECT", order: 1, question: 'How do you say "I like this"?' },
      { id: 87, lessonId: 18, type: "SELECT", order: 2, question: 'How do you say "I don\'t like this"?' },
      { id: 88, lessonId: 18, type: "SELECT", order: 3, question: 'How do you say "I want to eat"?' },
      { id: 89, lessonId: 18, type: "SELECT", order: 4, question: 'How do you say "Do you like rice?"' },
      { id: 90, lessonId: 18, type: "SELECT", order: 5, question: 'How do you say "I want water"?' },

      // U2-L4 (Emotions) - Lesson ID 19
      { id: 91, lessonId: 19, type: "SELECT", order: 1, question: 'How do you say "I love you"?' },
      { id: 92, lessonId: 19, type: "SELECT", order: 2, question: 'How do you say "I miss you"?' },
      { id: 93, lessonId: 19, type: "SELECT", order: 3, question: 'How do you say "I am happy"?' },
      { id: 94, lessonId: 19, type: "SELECT", order: 4, question: 'How do you say "I am sad"?' },
      { id: 95, lessonId: 19, type: "SELECT", order: 5, question: 'How do you say "Are you tired?"' },

      // U2-L5 (Politeness) - Lesson ID 20
      { id: 96, lessonId: 20, type: "SELECT", order: 1, question: 'How do you say "Excuse me" (when passing)?' },
      { id: 97, lessonId: 20, type: "SELECT", order: 2, question: 'How do you say "I don\'t know"?' },
      { id: 98, lessonId: 20, type: "SELECT", order: 3, question: 'How do you say "Thank you very much"?' },
      { id: 99, lessonId: 20, type: "SELECT", order: 4, question: 'How do you say "You\'re welcome"?' },
      { id: 100, lessonId: 20, type: "SELECT", order: 5, question: 'How do you say "Let\'s eat"?' },
    ]);

    // 5. Insert Challenge Options
    // NOTE: SHUFFLED order so correct option isn't always first
    await db.insert(schema.challengeOptions).values([
      // ============================================
      // FILIPINO OPTIONS (Shuffled)
      // ============================================
      
      // U1-L1-C1: Father
      { challengeId: 1, correct: false, text: "Nanay", audioSrc: "/ph_nanay.mp3" },
      { challengeId: 1, correct: true, text: "Tatay", audioSrc: "/ph_tatay.mp3" },
      { challengeId: 1, correct: false, text: "Kuya", audioSrc: "/ph_kuya.mp3" },

      // U1-L1-C2: Mother
      { challengeId: 2, correct: false, text: "Tatay", audioSrc: "/ph_tatay.mp3" },
      { challengeId: 2, correct: true, text: "Nanay", audioSrc: "/ph_nanay.mp3" },
      { challengeId: 2, correct: false, text: "Ate", audioSrc: "/ph_ate.mp3" },

      // U1-L1-C3: Older Brother
      { challengeId: 3, correct: false, text: "Lolo", audioSrc: "/ph_lolo.mp3" },
      { challengeId: 3, correct: false, text: "Bunso", audioSrc: "/ph_bunso.mp3" },
      { challengeId: 3, correct: true, text: "Kuya", audioSrc: "/ph_kuya.mp3" },

      // U1-L1-C4: Older Sister
      { challengeId: 4, correct: true, text: "Ate", audioSrc: "/ph_ate.mp3" },
      { challengeId: 4, correct: false, text: "Kuya", audioSrc: "/ph_kuya.mp3" },
      { challengeId: 4, correct: false, text: "Tita", audioSrc: "/ph_tita.mp3" },

      // U1-L1-C5: Grandfather
      { challengeId: 5, correct: false, text: "Lola", audioSrc: "/ph_lola.mp3" },
      { challengeId: 5, correct: true, text: "Lolo", audioSrc: "/ph_lolo.mp3" },
      { challengeId: 5, correct: false, text: "Tito", audioSrc: "/ph_tito.mp3" },

      // U1-L2-C1: Eat
      { challengeId: 6, correct: false, text: "Uminom", audioSrc: "/ph_uminom.mp3" },
      { challengeId: 6, correct: false, text: "Matulog", audioSrc: "/ph_matulog.mp3" },
      { challengeId: 6, correct: true, text: "Kumain", audioSrc: "/ph_kumain.mp3" },

      // U1-L2-C2: Drink
      { challengeId: 7, correct: true, text: "Uminom", audioSrc: "/ph_uminom.mp3" },
      { challengeId: 7, correct: false, text: "Kumain", audioSrc: "/ph_kumain.mp3" },
      { challengeId: 7, correct: false, text: "Tumakbo", audioSrc: "/ph_tumakbo.mp3" },

      // U1-L2-C3: Sleep
      { challengeId: 8, correct: false, text: "Gumising", audioSrc: "/ph_gumising.mp3" },
      { challengeId: 8, correct: true, text: "Matulog", audioSrc: "/ph_matulog.mp3" },
      { challengeId: 8, correct: false, text: "Maglakad", audioSrc: "/ph_maglakad.mp3" },

      // U1-L2-C4: Walk
      { challengeId: 9, correct: false, text: "Umupo", audioSrc: "/ph_umupo.mp3" },
      { challengeId: 9, correct: true, text: "Maglakad", audioSrc: "/ph_maglakad.mp3" },
      { challengeId: 9, correct: false, text: "Tumawa", audioSrc: "/ph_tumawa.mp3" },

      // U1-L2-C5: Read
      { challengeId: 10, correct: false, text: "Magsulat", audioSrc: "/ph_magsulat.mp3" },
      { challengeId: 10, correct: false, text: "Magluto", audioSrc: "/ph_magluto.mp3" },
      { challengeId: 10, correct: true, text: "Magbasa", audioSrc: "/ph_magbasa.mp3" },

      // U1-L3-C1: Beautiful
      { challengeId: 11, correct: false, text: "Pangit", audioSrc: "/ph_pangit.mp3" },
      { challengeId: 11, correct: true, text: "Maganda", audioSrc: "/ph_maganda.mp3" },
      { challengeId: 11, correct: false, text: "Maliit", audioSrc: "/ph_maliit.mp3" },

      // U1-L3-C2: Big
      { challengeId: 12, correct: false, text: "Maliit", audioSrc: "/ph_maliit.mp3" },
      { challengeId: 12, correct: true, text: "Malaki", audioSrc: "/ph_malaki.mp3" },
      { challengeId: 12, correct: false, text: "Payat", audioSrc: "/ph_payat.mp3" },

      // U1-L3-C3: Happy
      { challengeId: 13, correct: true, text: "Masaya", audioSrc: "/ph_masaya.mp3" },
      { challengeId: 13, correct: false, text: "Malungkot", audioSrc: "/ph_malungkot.mp3" },
      { challengeId: 13, correct: false, text: "Galit", audioSrc: "/ph_galit.mp3" },

      // U1-L3-C4: Delicious
      { challengeId: 14, correct: false, text: "Mapait", audioSrc: "/ph_mapait.mp3" },
      { challengeId: 14, correct: false, text: "Maalat", audioSrc: "/ph_maalat.mp3" },
      { challengeId: 14, correct: true, text: "Masarap", audioSrc: "/ph_masarap.mp3" },

      // U1-L3-C5: Hot
      { challengeId: 15, correct: false, text: "Malamig", audioSrc: "/ph_malamig.mp3" },
      { challengeId: 15, correct: true, text: "Mainit", audioSrc: "/ph_mainit.mp3" },
      { challengeId: 15, correct: false, text: "Mabigat", audioSrc: "/ph_mabigat.mp3" },

      // U1-L4-C1: Rice
      { challengeId: 16, correct: false, text: "Ulam", audioSrc: "/ph_ulam.mp3" },
      { challengeId: 16, correct: true, text: "Kanin", audioSrc: "/ph_kanin.mp3" },
      { challengeId: 16, correct: false, text: "Sabaw", audioSrc: "/ph_sabaw.mp3" },

      // U1-L4-C2: Water
      { challengeId: 17, correct: true, text: "Tubig", audioSrc: "/ph_tubig.mp3" },
      { challengeId: 17, correct: false, text: "Kape", audioSrc: "/ph_kape.mp3" },
      { challengeId: 17, correct: false, text: "Gatas", audioSrc: "/ph_gatas.mp3" },

      // U1-L4-C3: Bread
      { challengeId: 18, correct: false, text: "Itlog", audioSrc: "/ph_itlog.mp3" },
      { challengeId: 18, correct: false, text: "Asukal", audioSrc: "/ph_asukal.mp3" },
      { challengeId: 18, correct: true, text: "Tinapay", audioSrc: "/ph_tinapay.mp3" },

      // U1-L4-C4: Fish
      { challengeId: 19, correct: false, text: "Manok", audioSrc: "/ph_manok.mp3" },
      { challengeId: 19, correct: true, text: "Isda", audioSrc: "/ph_isda.mp3" },
      { challengeId: 19, correct: false, text: "Baboy", audioSrc: "/ph_baboy.mp3" },

      // U1-L4-C5: Chicken
      { challengeId: 20, correct: false, text: "Baka", audioSrc: "/ph_baka.mp3" },
      { challengeId: 20, correct: false, text: "Gulay", audioSrc: "/ph_gulay.mp3" },
      { challengeId: 20, correct: true, text: "Manok", audioSrc: "/ph_manok.mp3" },

      // U1-L5-C1: Yes
      { challengeId: 21, correct: true, text: "Oo", audioSrc: "/ph_oo.mp3" },
      { challengeId: 21, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" },
      { challengeId: 21, correct: false, text: "Wala", audioSrc: "/ph_wala.mp3" },

      // U1-L5-C2: No
      { challengeId: 22, correct: false, text: "Oo", audioSrc: "/ph_oo.mp3" },
      { challengeId: 22, correct: true, text: "Hindi", audioSrc: "/ph_hindi.mp3" },
      { challengeId: 22, correct: false, text: "Mayroon", audioSrc: "/ph_mayroon.mp3" },

      // U1-L5-C3: Thank you
      { challengeId: 23, correct: false, text: "Paalam", audioSrc: "/ph_paalam.mp3" },
      { challengeId: 23, correct: false, text: "Kamusta", audioSrc: "/ph_kamusta.mp3" },
      { challengeId: 23, correct: true, text: "Salamat", audioSrc: "/ph_salamat.mp3" },

      // U1-L5-C4: Good morning
      { challengeId: 24, correct: false, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" },
      { challengeId: 24, correct: true, text: "Magandang umaga", audioSrc: "/ph_umaga.mp3" },
      { challengeId: 24, correct: false, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" },

      // U1-L5-C5: Goodbye
      { challengeId: 25, correct: false, text: "Salamat", audioSrc: "/ph_salamat.mp3" },
      { challengeId: 25, correct: true, text: "Paalam", audioSrc: "/ph_paalam.mp3" },
      { challengeId: 25, correct: false, text: "Mahal kita", audioSrc: "/ph_mahalkita.mp3" },

      // U2-L1-C1: Good afternoon
      { challengeId: 26, correct: false, text: "Magandang umaga", audioSrc: "/ph_umaga.mp3" },
      { challengeId: 26, correct: true, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" },
      { challengeId: 26, correct: false, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" },

      // U2-L1-C2: Good evening
      { challengeId: 27, correct: false, text: "Magandang hapon", audioSrc: "/ph_hapon.mp3" },
      { challengeId: 27, correct: false, text: "Paalam na", audioSrc: "/ph_paalam.mp3" },
      { challengeId: 27, correct: true, text: "Magandang gabi", audioSrc: "/ph_gabi.mp3" },

      // U2-L1-C3: How are you?
      { challengeId: 28, correct: true, text: "Kamusta ka?", audioSrc: "/ph_kamusta.mp3" },
      { challengeId: 28, correct: false, text: "Sino ka?", audioSrc: "/ph_sino.mp3" },
      { challengeId: 28, correct: false, text: "Nasaan ka?", audioSrc: "/ph_nasaan.mp3" },

      // U2-L1-C4: I am fine
      { challengeId: 29, correct: false, text: "Masama naman", audioSrc: "/ph_masama.mp3" },
      { challengeId: 29, correct: true, text: "Mabuti naman", audioSrc: "/ph_mabuti.mp3" },
      { challengeId: 29, correct: false, text: "Wala naman", audioSrc: "/ph_wala.mp3" },

      // U2-L1-C5: Take care
      { challengeId: 30, correct: false, text: "Alis", audioSrc: "/ph_alis.mp3" },
      { challengeId: 30, correct: false, text: "Tulog", audioSrc: "/ph_tulog.mp3" },
      { challengeId: 30, correct: true, text: "Ingat", audioSrc: "/ph_ingat.mp3" },

      // U2-L2-C1: What is your name?
      { challengeId: 31, correct: false, text: "Taga-saan ka?", audioSrc: "/ph_tagasaan.mp3" },
      { challengeId: 31, correct: true, text: "Anong pangalan mo?", audioSrc: "/ph_pangalan.mp3" },
      { challengeId: 31, correct: false, text: "Ilang taon ka na?", audioSrc: "/ph_edad.mp3" },

      // U2-L2-C2: My name is...
      { challengeId: 32, correct: true, text: "Ang pangalan ko ay...", audioSrc: "/ph_myname.mp3" },
      { challengeId: 32, correct: false, text: "Ang gusto ko ay...", audioSrc: "/ph_gusto.mp3" },
      { challengeId: 32, correct: false, text: "Ang kapatid ko ay...", audioSrc: "/ph_kapatid.mp3" },

      // U2-L2-C3: I am Filipino
      { challengeId: 33, correct: false, text: "Ikaw ay Pilipino", audioSrc: "/ph_ikaw.mp3" },
      { challengeId: 33, correct: true, text: "Ako ay Pilipino", audioSrc: "/ph_filipino.mp3" },
      { challengeId: 33, correct: false, text: "Siya ay Pilipino", audioSrc: "/ph_siya.mp3" },

      // U2-L2-C4: Who are you?
      { challengeId: 34, correct: false, text: "Ano ka?", audioSrc: "/ph_ano.mp3" },
      { challengeId: 34, correct: true, text: "Sino ka?", audioSrc: "/ph_sino.mp3" },
      { challengeId: 34, correct: false, text: "Bakit ka?", audioSrc: "/ph_bakit.mp3" },

      // U2-L2-C5: Are you American?
      { challengeId: 35, correct: false, text: "Pilipino ka ba?", audioSrc: "/ph_pilipino.mp3" },
      { challengeId: 35, correct: false, text: "Saan ka galing?", audioSrc: "/ph_saan.mp3" },
      { challengeId: 35, correct: true, text: "Amerikano ka ba?", audioSrc: "/ph_amerikano.mp3" },

      // U2-L3-C1: I like this
      { challengeId: 36, correct: true, text: "Gusto ko ito", audioSrc: "/ph_gusto.mp3" },
      { challengeId: 36, correct: false, text: "Ayaw ko ito", audioSrc: "/ph_ayaw.mp3" },
      { challengeId: 36, correct: false, text: "Meron ako nito", audioSrc: "/ph_meron.mp3" },

      // U2-L3-C2: I don't like this
      { challengeId: 37, correct: false, text: "Gusto ko nito", audioSrc: "/ph_gusto.mp3" },
      { challengeId: 37, correct: true, text: "Ayaw ko nito", audioSrc: "/ph_ayaw.mp3" },
      { challengeId: 37, correct: false, text: "Mahal ko ito", audioSrc: "/ph_mahal.mp3" },

      // U2-L3-C3: I want to eat
      { challengeId: 38, correct: false, text: "Gusto kong matulog", audioSrc: "/ph_gustomatulog.mp3" },
      { challengeId: 38, correct: true, text: "Gusto kong kumain", audioSrc: "/ph_gustokumain.mp3" },
      { challengeId: 38, correct: false, text: "Ayaw kong kumain", audioSrc: "/ph_ayawkumain.mp3" },

      // U2-L3-C4: Do you like rice?
      { challengeId: 39, correct: false, text: "Gusto mo ba ng tubig?", audioSrc: "/ph_gustotubig.mp3" },
      { challengeId: 39, correct: true, text: "Gusto mo ba ng kanin?", audioSrc: "/ph_gustokanin.mp3" },
      { challengeId: 39, correct: false, text: "Meron ka bang kanin?", audioSrc: "/ph_meronkanin.mp3" },

      // U2-L3-C5: I want water
      { challengeId: 40, correct: false, text: "Ayaw ko ng tubig", audioSrc: "/ph_ayawtubig.mp3" },
      { challengeId: 40, correct: false, text: "Uminom ako ng tubig", audioSrc: "/ph_inomtubig.mp3" },
      { challengeId: 40, correct: true, text: "Gusto ko ng tubig", audioSrc: "/ph_gustotubig.mp3" },

      // U2-L4-C1: I love you
      { challengeId: 41, correct: true, text: "Mahal kita", audioSrc: "/ph_mahalkita.mp3" },
      { challengeId: 41, correct: false, text: "Mahal ko siya", audioSrc: "/ph_mahalsiya.mp3" },
      { challengeId: 41, correct: false, text: "Galit ako", audioSrc: "/ph_galit.mp3" },

      // U2-L4-C2: I miss you
      { challengeId: 42, correct: false, text: "Ayaw na kita", audioSrc: "/ph_ayawkita.mp3" },
      { challengeId: 42, correct: true, text: "Miss na kita", audioSrc: "/ph_misskita.mp3" },
      { challengeId: 42, correct: false, text: "Aalis na ako", audioSrc: "/ph_aalis.mp3" },

      // U2-L4-C3: I am happy
      { challengeId: 43, correct: false, text: "Malungkot ako", audioSrc: "/ph_malungkot.mp3" },
      { challengeId: 43, correct: false, text: "Gutom ako", audioSrc: "/ph_gutom.mp3" },
      { challengeId: 43, correct: true, text: "Masaya ako", audioSrc: "/ph_masaya.mp3" },

      // U2-L4-C4: I am sad
      { challengeId: 44, correct: true, text: "Malungkot ako", audioSrc: "/ph_malungkot.mp3" },
      { challengeId: 44, correct: false, text: "Masaya ako", audioSrc: "/ph_masaya.mp3" },
      { challengeId: 44, correct: false, text: "Pagod ako", audioSrc: "/ph_pagod.mp3" },

      // U2-L4-C5: Are you tired?
      { challengeId: 45, correct: false, text: "Galit ka ba?", audioSrc: "/ph_galit.mp3" },
      { challengeId: 45, correct: true, text: "Pagod ka ba?", audioSrc: "/ph_pagod.mp3" },
      { challengeId: 45, correct: false, text: "Gutom ka ba?", audioSrc: "/ph_gutom.mp3" },

      // U2-L5-C1: Yes (Polite)
      { challengeId: 46, correct: false, text: "Oo", audioSrc: "/ph_oo.mp3" },
      { challengeId: 46, correct: true, text: "Opo", audioSrc: "/ph_opo.mp3" },
      { challengeId: 46, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" },

      // U2-L5-C2: No (Polite)
      { challengeId: 47, correct: false, text: "Hindi", audioSrc: "/ph_hindi.mp3" },
      { challengeId: 47, correct: false, text: "Wala po", audioSrc: "/ph_walapo.mp3" },
      { challengeId: 47, correct: true, text: "Hindi po", audioSrc: "/ph_hindipo.mp3" },

      // U2-L5-C3: Thank you (Polite)
      { challengeId: 48, correct: true, text: "Salamat po", audioSrc: "/ph_salamatpo.mp3" },
      { challengeId: 48, correct: false, text: "Walang anuman", audioSrc: "/ph_walanganuman.mp3" },
      { challengeId: 48, correct: false, text: "Pasensya na", audioSrc: "/ph_pasensya.mp3" },

      // U2-L5-C4: Excuse me
      { challengeId: 49, correct: false, text: "Aalis na po", audioSrc: "/ph_aalis.mp3" },
      { challengeId: 49, correct: true, text: "Makikiraan po", audioSrc: "/ph_makikiraan.mp3" },
      { challengeId: 49, correct: false, text: "Dito lang po", audioSrc: "/ph_dito.mp3" },

      // U2-L5-C5: I don't know (Polite)
      { challengeId: 50, correct: false, text: "Alam ko po", audioSrc: "/ph_alamko.mp3" },
      { challengeId: 50, correct: false, text: "Hindi ko alam", audioSrc: "/ph_hindialam.mp3" },
      { challengeId: 50, correct: true, text: "Hindi ko po alam", audioSrc: "/ph_hindialam.mp3" },

      // ============================================
      // CEBUANO OPTIONS (Shuffled)
      // ============================================

      // U1-L1-C1: Father (Tatay)
      { challengeId: 51, correct: false, text: "Nanay", audioSrc: "/cebu_nanay.mp3" },
      { challengeId: 51, correct: true, text: "Tatay", audioSrc: "/cebu_tatay.mp3" },
      { challengeId: 51, correct: false, text: "Manoy", audioSrc: "/cebu_manoy.mp3" },

      // U1-L1-C2: Mother (Nanay)
      { challengeId: 52, correct: false, text: "Tatay", audioSrc: "/cebu_tatay.mp3" },
      { challengeId: 52, correct: true, text: "Nanay", audioSrc: "/cebu_nanay.mp3" },
      { challengeId: 52, correct: false, text: "Manang", audioSrc: "/cebu_manang.mp3" },

      // U1-L1-C3: Older Brother (Manoy)
      { challengeId: 53, correct: false, text: "Bunso", audioSrc: "/cebu_bunso.mp3" },
      { challengeId: 53, correct: true, text: "Manoy", audioSrc: "/cebu_manoy.mp3" },
      { challengeId: 53, correct: false, text: "Lolo", audioSrc: "/cebu_lolo.mp3" },

      // U1-L1-C4: Older Sister (Manang)
      { challengeId: 54, correct: true, text: "Manang", audioSrc: "/cebu_manang.mp3" },
      { challengeId: 54, correct: false, text: "Manoy", audioSrc: "/cebu_manoy.mp3" },
      { challengeId: 54, correct: false, text: "Tita", audioSrc: "/cebu_tita.mp3" },

      // U1-L1-C5: Grandfather (Lolo)
      { challengeId: 55, correct: false, text: "Lola", audioSrc: "/cebu_lola.mp3" },
      { challengeId: 55, correct: false, text: "Tito", audioSrc: "/cebu_tito.mp3" },
      { challengeId: 55, correct: true, text: "Lolo", audioSrc: "/cebu_lolo.mp3" },

      // U1-L2-C1: Eat (Mokaon)
      { challengeId: 56, correct: false, text: "Moinom", audioSrc: "/cebu_moinom.mp3" },
      { challengeId: 56, correct: true, text: "Mokaon", audioSrc: "/cebu_mokaon.mp3" },
      { challengeId: 56, correct: false, text: "Matulog", audioSrc: "/cebu_matulog.mp3" },

      // U1-L2-C2: Drink (Moinom)
      { challengeId: 57, correct: false, text: "Mokaon", audioSrc: "/cebu_mokaon.mp3" },
      { challengeId: 57, correct: false, text: "Modagan", audioSrc: "/cebu_modagan.mp3" },
      { challengeId: 57, correct: true, text: "Moinom", audioSrc: "/cebu_moinom.mp3" },

      // U1-L2-C3: Sleep (Matulog)
      { challengeId: 58, correct: true, text: "Matulog", audioSrc: "/cebu_matulog.mp3" },
      { challengeId: 58, correct: false, text: "Momata", audioSrc: "/cebu_momata.mp3" },
      { challengeId: 58, correct: false, text: "Maglakaw", audioSrc: "/cebu_maglakaw.mp3" },

      // U1-L2-C4: Walk (Maglakaw)
      { challengeId: 59, correct: false, text: "Molingkod", audioSrc: "/cebu_molingkod.mp3" },
      { challengeId: 59, correct: true, text: "Maglakaw", audioSrc: "/cebu_maglakaw.mp3" },
      { challengeId: 59, correct: false, text: "Mokatawa", audioSrc: "/cebu_mokatawa.mp3" },

      // U1-L2-C5: Read (Magbasa)
      { challengeId: 60, correct: false, text: "Magsulat", audioSrc: "/cebu_magsulat.mp3" },
      { challengeId: 60, correct: true, text: "Magbasa", audioSrc: "/cebu_magbasa.mp3" },
      { challengeId: 60, correct: false, text: "Magluto", audioSrc: "/cebu_magluto.mp3" },

      // U1-L3-C1: Beautiful (Gwapa)
      { challengeId: 61, correct: false, text: "Bati", audioSrc: "/cebu_bati.mp3" },
      { challengeId: 61, correct: false, text: "Gamay", audioSrc: "/cebu_gamay.mp3" },
      { challengeId: 61, correct: true, text: "Gwapa", audioSrc: "/cebu_gwapa.mp3" },

      // U1-L3-C2: Big (Dako)
      { challengeId: 62, correct: true, text: "Dako", audioSrc: "/cebu_dako.mp3" },
      { challengeId: 62, correct: false, text: "Gamay", audioSrc: "/cebu_gamay.mp3" },
      { challengeId: 62, correct: false, text: "Niwang", audioSrc: "/cebu_niwang.mp3" },

      // U1-L3-C3: Happy (Malipayon)
      { challengeId: 63, correct: false, text: "Guol", audioSrc: "/cebu_guol.mp3" },
      { challengeId: 63, correct: true, text: "Malipayon", audioSrc: "/cebu_malipayon.mp3" },
      { challengeId: 63, correct: false, text: "Isog", audioSrc: "/cebu_isog.mp3" },

      // U1-L3-C4: Delicious (Lami)
      { challengeId: 64, correct: false, text: "Pait", audioSrc: "/cebu_pait.mp3" },
      { challengeId: 64, correct: true, text: "Lami", audioSrc: "/cebu_lami.mp3" },
      { challengeId: 64, correct: false, text: "Parat", audioSrc: "/cebu_parat.mp3" },

      // U1-L3-C5: Hot (Init)
      { challengeId: 65, correct: true, text: "Init", audioSrc: "/cebu_init.mp3" },
      { challengeId: 65, correct: false, text: "Bugnaw", audioSrc: "/cebu_bugnaw.mp3" },
      { challengeId: 65, correct: false, text: "Bug-at", audioSrc: "/cebu_bugat.mp3" },

      // U1-L4-C1: Rice (Kan-on)
      { challengeId: 66, correct: false, text: "Sud-an", audioSrc: "/cebu_sudan.mp3" },
      { challengeId: 66, correct: false, text: "Sabaw", audioSrc: "/cebu_sabaw.mp3" },
      { challengeId: 66, correct: true, text: "Kan-on", audioSrc: "/cebu_kanon.mp3" },

      // U1-L4-C2: Water (Tubig)
      { challengeId: 67, correct: true, text: "Tubig", audioSrc: "/cebu_tubig.mp3" },
      { challengeId: 67, correct: false, text: "Kape", audioSrc: "/cebu_kape.mp3" },
      { challengeId: 67, correct: false, text: "Gatas", audioSrc: "/cebu_gatas.mp3" },

      // U1-L4-C3: Bread (Pan)
      { challengeId: 68, correct: false, text: "Itlog", audioSrc: "/cebu_itlog.mp3" },
      { challengeId: 68, correct: true, text: "Pan", audioSrc: "/cebu_pan.mp3" },
      { challengeId: 68, correct: false, text: "Asukal", audioSrc: "/cebu_asukal.mp3" },

      // U1-L4-C4: Fish (Isda)
      { challengeId: 69, correct: false, text: "Manok", audioSrc: "/cebu_manok.mp3" },
      { challengeId: 69, correct: true, text: "Isda", audioSrc: "/cebu_isda.mp3" },
      { challengeId: 69, correct: false, text: "Baboy", audioSrc: "/cebu_baboy.mp3" },

      // U1-L4-C5: Chicken (Manok)
      { challengeId: 70, correct: false, text: "Baka", audioSrc: "/cebu_baka.mp3" },
      { challengeId: 70, correct: false, text: "Gulay", audioSrc: "/cebu_gulay.mp3" },
      { challengeId: 70, correct: true, text: "Manok", audioSrc: "/cebu_manok.mp3" },

      // U1-L5-C1: Yes (O)
      { challengeId: 71, correct: true, text: "O", audioSrc: "/cebu_o.mp3" },
      { challengeId: 71, correct: false, text: "Dili", audioSrc: "/cebu_dili.mp3" },
      { challengeId: 71, correct: false, text: "Wala", audioSrc: "/cebu_wala.mp3" },

      // U1-L5-C2: No (Dili)
      { challengeId: 72, correct: false, text: "O", audioSrc: "/cebu_o.mp3" },
      { challengeId: 72, correct: true, text: "Dili", audioSrc: "/cebu_dili.mp3" },
      { challengeId: 72, correct: false, text: "Naa", audioSrc: "/cebu_naa.mp3" },

      // U1-L5-C3: Thank you (Salamat)
      { challengeId: 73, correct: false, text: "Babay", audioSrc: "/cebu_babay.mp3" },
      { challengeId: 73, correct: true, text: "Salamat", audioSrc: "/cebu_salamat.mp3" },
      { challengeId: 73, correct: false, text: "Kumusta", audioSrc: "/cebu_kumusta.mp3" },

      // U1-L5-C4: Good morning (Maayong buntag)
      { challengeId: 74, correct: true, text: "Maayong buntag", audioSrc: "/cebu_buntag.mp3" },
      { challengeId: 74, correct: false, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" },
      { challengeId: 74, correct: false, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" },

      // U1-L5-C5: Goodbye (Babay / Ayo-ayo)
      { challengeId: 75, correct: false, text: "Salamat", audioSrc: "/cebu_salamat.mp3" },
      { challengeId: 75, correct: false, text: "Gimingaw ko", audioSrc: "/cebu_gimingaw.mp3" },
      { challengeId: 75, correct: true, text: "Babay / Ayo-ayo", audioSrc: "/cebu_babay.mp3" },

      // U2-L1-C1: Good afternoon (Maayong hapon)
      { challengeId: 76, correct: false, text: "Maayong buntag", audioSrc: "/cebu_buntag.mp3" },
      { challengeId: 76, correct: true, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" },
      { challengeId: 76, correct: false, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" },

      // U2-L1-C2: Good evening (Maayong gabii)
      { challengeId: 77, correct: false, text: "Maayong hapon", audioSrc: "/cebu_hapon.mp3" },
      { challengeId: 77, correct: true, text: "Maayong gabii", audioSrc: "/cebu_gabii.mp3" },
      { challengeId: 77, correct: false, text: "Babay na", audioSrc: "/cebu_babay.mp3" },

      // U2-L1-C3: How are you? (Kumusta ka?)
      { challengeId: 78, correct: true, text: "Kumusta ka?", audioSrc: "/cebu_kumusta.mp3" },
      { challengeId: 78, correct: false, text: "Kinsa ka?", audioSrc: "/cebu_kinsa.mp3" },
      { challengeId: 78, correct: false, text: "Asa ka?", audioSrc: "/cebu_asa.mp3" },

      // U2-L1-C4: I am fine (Maayo ra)
      { challengeId: 79, correct: false, text: "Bati ra", audioSrc: "/cebu_bati.mp3" },
      { challengeId: 79, correct: true, text: "Maayo ra", audioSrc: "/cebu_maayo.mp3" },
      { challengeId: 79, correct: false, text: "Wala ra", audioSrc: "/cebu_wala.mp3" },

      // U2-L1-C5: Take care (Pag-amping)
      { challengeId: 80, correct: false, text: "Lakaw na", audioSrc: "/cebu_lakaw.mp3" },
      { challengeId: 80, correct: false, text: "Tulog na", audioSrc: "/cebu_tulog.mp3" },
      { challengeId: 80, correct: true, text: "Pag-amping", audioSrc: "/cebu_amping.mp3" },

      // U2-L2-C1: What is your name? (Unsay ngalan nimo?)
      { challengeId: 81, correct: false, text: "Taga-asa ka?", audioSrc: "/cebu_asa.mp3" },
      { challengeId: 81, correct: true, text: "Unsay ngalan nimo?", audioSrc: "/cebu_ngalan.mp3" },
      { challengeId: 81, correct: false, text: "Pila imong edad?", audioSrc: "/cebu_edad.mp3" },

      // U2-L2-C2: My name is... (Ang ngalan nako kay...)
      { challengeId: 82, correct: true, text: "Ang ngalan nako kay...", audioSrc: "/cebu_myname.mp3" },
      { challengeId: 82, correct: false, text: "Ang gusto nako kay...", audioSrc: "/cebu_gusto.mp3" },
      { challengeId: 82, correct: false, text: "Ang igsoon nako kay...", audioSrc: "/cebu_igsoon.mp3" },

      // U2-L2-C3: I am Filipino (Pilipino ko)
      { challengeId: 83, correct: false, text: "Pilipino ka", audioSrc: "/cebu_pilipinoka.mp3" },
      { challengeId: 83, correct: true, text: "Pilipino ko", audioSrc: "/cebu_pilipinoko.mp3" },
      { challengeId: 83, correct: false, text: "Pilipino siya", audioSrc: "/cebu_pilipinosiya.mp3" },

      // U2-L2-C4: Who are you? (Kinsa ka?)
      { challengeId: 84, correct: false, text: "Unsa ka?", audioSrc: "/cebu_unsa.mp3" },
      { challengeId: 84, correct: true, text: "Kinsa ka?", audioSrc: "/cebu_kinsa.mp3" },
      { challengeId: 84, correct: false, text: "Ngano ka?", audioSrc: "/cebu_ngano.mp3" },

      // U2-L2-C5: Are you American? (Amerikano ka ba?)
      { challengeId: 85, correct: false, text: "Pilipino ka ba?", audioSrc: "/cebu_pilipino.mp3" },
      { challengeId: 85, correct: false, text: "Asa ka gikan?", audioSrc: "/cebu_asagikan.mp3" },
      { challengeId: 85, correct: true, text: "Amerikano ka ba?", audioSrc: "/cebu_amerikano.mp3" },

      // U2-L3-C1: I like this (Ganahan ko ani)
      { challengeId: 86, correct: true, text: "Ganahan ko ani", audioSrc: "/cebu_ganahan.mp3" },
      { challengeId: 86, correct: false, text: "Dili ko ganahan ani", audioSrc: "/cebu_diligana.mp3" },
      { challengeId: 86, correct: false, text: "Naa ko ani", audioSrc: "/cebu_naako.mp3" },

      // U2-L3-C2: I don't like this (Dili ko ganahan ani)
      { challengeId: 87, correct: false, text: "Ganahan ko ani", audioSrc: "/cebu_ganahan.mp3" },
      { challengeId: 87, correct: true, text: "Dili ko ganahan ani", audioSrc: "/cebu_diligana.mp3" },
      { challengeId: 87, correct: false, text: "Mahal nako ni", audioSrc: "/cebu_mahal.mp3" },

      // U2-L3-C3: I want to eat (Gusto ko mokaon)
      { challengeId: 88, correct: false, text: "Gusto ko matulog", audioSrc: "/cebu_gustomatulog.mp3" },
      { challengeId: 88, correct: true, text: "Gusto ko mokaon", audioSrc: "/cebu_gustomokaon.mp3" },
      { challengeId: 88, correct: false, text: "Dili ko mokaon", audioSrc: "/cebu_dilimokaon.mp3" },

      // U2-L3-C4: Do you like rice? (Ganahan ka og kan-on?)
      { challengeId: 89, correct: false, text: "Ganahan ka og tubig?", audioSrc: "/cebu_ganahantubig.mp3" },
      { challengeId: 89, correct: true, text: "Ganahan ka og kan-on?", audioSrc: "/cebu_ganahankanon.mp3" },
      { challengeId: 89, correct: false, text: "Naa kay kan-on?", audioSrc: "/cebu_naakanon.mp3" },

      // U2-L3-C5: I want water (Gusto ko og tubig)
      { challengeId: 90, correct: false, text: "Dili ko og tubig", audioSrc: "/cebu_dilitubig.mp3" },
      { challengeId: 90, correct: false, text: "Moinom ko og tubig", audioSrc: "/cebu_inomtubig.mp3" },
      { challengeId: 90, correct: true, text: "Gusto ko og tubig", audioSrc: "/cebu_gustotubig.mp3" },

      // U2-L4-C1: I love you (Gihigugma tika)
      { challengeId: 91, correct: true, text: "Gihigugma tika", audioSrc: "/cebu_gihigugma.mp3" },
      { challengeId: 91, correct: false, text: "Gihigugma niya", audioSrc: "/cebu_gihigugmaniya.mp3" },
      { challengeId: 91, correct: false, text: "Isog ko", audioSrc: "/cebu_isog.mp3" },

      // U2-L4-C2: I miss you (Gimingaw ko nimo)
      { challengeId: 92, correct: false, text: "Dili ko nimo", audioSrc: "/cebu_diliko.mp3" },
      { challengeId: 92, correct: true, text: "Gimingaw ko nimo", audioSrc: "/cebu_gimingaw.mp3" },
      { challengeId: 92, correct: false, text: "Molakaw na ko", audioSrc: "/cebu_molakaw.mp3" },

      // U2-L4-C3: I am happy (Malipayon ko)
      { challengeId: 93, correct: false, text: "Guol ko", audioSrc: "/cebu_guol.mp3" },
      { challengeId: 93, correct: false, text: "Gigutom ko", audioSrc: "/cebu_gigutom.mp3" },
      { challengeId: 93, correct: true, text: "Malipayon ko", audioSrc: "/cebu_malipayon.mp3" },

      // U2-L4-C4: I am sad (Guol ko)
      { challengeId: 94, correct: true, text: "Guol ko", audioSrc: "/cebu_guol.mp3" },
      { challengeId: 94, correct: false, text: "Malipayon ko", audioSrc: "/cebu_malipayon.mp3" },
      { challengeId: 94, correct: false, text: "Gikapoy ko", audioSrc: "/cebu_gikapoy.mp3" },

      // U2-L4-C5: Are you tired? (Gikapoy ka ba?)
      { challengeId: 95, correct: false, text: "Isog ka ba?", audioSrc: "/cebu_isog.mp3" },
      { challengeId: 95, correct: true, text: "Gikapoy ka ba?", audioSrc: "/cebu_gikapoy.mp3" },
      { challengeId: 95, correct: false, text: "Gigutom ka ba?", audioSrc: "/cebu_gigutom.mp3" },

      // U2-L5-C1: Excuse me (Tabi / Makikiraan)
      { challengeId: 96, correct: false, text: "Aalis na ko", audioSrc: "/cebu_aalis.mp3" },
      { challengeId: 96, correct: true, text: "Tabi / Makikiraan", audioSrc: "/cebu_tabi.mp3" },
      { challengeId: 96, correct: false, text: "Dito lang ko", audioSrc: "/cebu_dito.mp3" },

      // U2-L5-C2: I don't know (Ambot)
      { challengeId: 97, correct: false, text: "Kabalo ko", audioSrc: "/cebu_kabalo.mp3" },
      { challengeId: 97, correct: false, text: "Nakalimot ko", audioSrc: "/cebu_nakalimot.mp3" },
      { challengeId: 97, correct: true, text: "Ambot", audioSrc: "/cebu_ambot.mp3" },

      // U2-L5-C3: Thank you very much (Salamat kaayo)
      { challengeId: 98, correct: true, text: "Salamat kaayo", audioSrc: "/cebu_salamatkaayo.mp3" },
      { challengeId: 98, correct: false, text: "Walay sapayan", audioSrc: "/cebu_walaysapayan.mp3" },
      { challengeId: 98, correct: false, text: "Pasensya na", audioSrc: "/cebu_pasensya.mp3" },

      // U2-L5-C4: You're welcome (Walay sapayan)
      { challengeId: 99, correct: false, text: "Salamat", audioSrc: "/cebu_salamat.mp3" },
      { challengeId: 99, correct: true, text: "Walay sapayan", audioSrc: "/cebu_walaysapayan.mp3" },
      { challengeId: 99, correct: false, text: "Way problema", audioSrc: "/cebu_wayproblema.mp3" },

      // U2-L5-C5: Let's eat (Mangaon na ta)
      { challengeId: 100, correct: false, text: "Manglakaw na ta", audioSrc: "/cebu_manglakaw.mp3" },
      { challengeId: 100, correct: false, text: "Matulog na ta", audioSrc: "/cebu_matulog.mp3" },
      { challengeId: 100, correct: true, text: "Mangaon na ta", audioSrc: "/cebu_mangaon.mp3" },
    ]);

    console.log("Seeding finished.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();