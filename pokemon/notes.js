

// Actualizar quantity
await cartModel.updateOne(
    { _id: cid, },
    { 
        $set: { "products.$[p].quantity": quantity }
    }, 
    { 
        arrayFilters: [{ "p._id": pid }] 
    }
) 