export async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to load products data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
