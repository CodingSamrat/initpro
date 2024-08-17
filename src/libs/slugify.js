export const slugify = (name) => {
    // Convert to string, lowercase, replace multiple spaces with a single space, and trim
    let lowerName = name.toString().toLowerCase().replace(/\s+/g, ' ').trim();

    // Initialize the slug
    let slug = "";

    // Loop through each character in the lowercase name
    for (let i = 0; i < lowerName.length; i++) {
        let letter = lowerName[i];

        // Replace spaces with hyphens
        if (letter === ' ') {
            letter = '-';
        }

        // Append only alphanumeric characters and underscores to the slug
        if (/^[a-z0-9-_]+$/.test(letter)) {
            slug += letter;
        }
    }

    return slug;
};


