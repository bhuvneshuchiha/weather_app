const z = require("zod");

locationSchema = z.object({
  location: z.string().min(3)
})

module.exports = {
  locationSchema
}
