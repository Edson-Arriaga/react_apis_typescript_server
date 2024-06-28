import { connectDB } from "../server"
import db from "../config/db"

jest.mock('../config/db.ts')

describe('conectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('There was an error connecting to the database...'))
    
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()
    
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('There was an error connecting to the database...')
        )
    })
})