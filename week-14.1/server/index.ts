import { publicProcedure, router } from "./trpc";
import { z } from 'zod';
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const todoInputTypes = z.object({
    title: z.string(),
    description: z.string(),
});

const appRouter = router({
    createTodo: publicProcedure.input(todoInputTypes).mutation(async (opts) => {
        const title = opts.input.title;
        const description = opts.input.description;

        //db stuff;
        return {
            id: "1"
        }
    })
})

const server = createHTTPServer({
    router:appRouter
});

server.listen(3000);

export type AppRouter = typeof appRouter;

