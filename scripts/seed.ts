import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Filipino",
                imageSrc: "/flags/ph.png"
            },
            {
                id: 2,
                title: "Cebuano",
                imageSrc: "/flags/cebu.jpg"
            },
            {
                id: 3,
                title: "Ilocano",
                imageSrc: "/flags/ilocano.png"
            },
            {
                id: 4,
                title: "Pangasinan",
                imageSrc: "/flags/pangasinan.png"
            },
            {
                id: 5,
                title: "Hiligaynon",
                imageSrc: "/flags/iloilo.png"
            },
            {
                id: 6,
                title: "Baybayin",
                imageSrc: "/flags/baybayin.png"
            },
        ]);

        await db.insert(schema.units).values([{
            id: 1,
            courseId: 1,
            title: "Unit 1",
            description: "Learn the Basics of Filipino",
            order: 1,
        }]);

        await db.insert(schema.lessons).values([{
            id: 1,
            unitId: 1,
            order: 1,
            title: "Nouns",
        },
        {
            id: 2,
            unitId: 1,
            order: 2,
            title: "Verbs",
        }
    ]);

        console.log("Seeding finished.")
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();