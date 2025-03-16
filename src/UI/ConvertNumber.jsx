
export const ConvertNumber = ({ num }) => {
    // Step 1: Convert the number to a string and extract the decimal part (if present)
    const numStr = num.toString();
    // Step 3: Define regular expressions for matching number patterns in the Indian digit system
    const croreRegex = /^(\d+)(\d{2})(\d{2})(\d{3})$/;
    const lakhRegex = /^(\d{1,2})(\d{2})(\d{3})$/;
    const thousandRegex = /^(\d{1,2})(\d{3})$/;
    let match;

    // Step 4: Try matching the number with the crore pattern first
    if (croreRegex.test(numStr)) {
        match = numStr.match(croreRegex);
        match.shift(); // Remove the first element (entire matched string)
        return `${match} Crore`;
    }

    // Step 5: If not matched with the crore pattern, try matching with the lakh pattern
    if (lakhRegex.test(numStr)) {
        match = numStr.match(lakhRegex);
        match.shift(); // Remove the first element (entire matched string)
        return `${match} Lakh`;
    }

    // Step 6: If not matched with the lakh pattern, try matching with the thousand pattern
    if (thousandRegex.test(numStr)) {
        match = numStr.match(thousandRegex);
        match.shift(); // Remove the first element (entire matched string)
        return `${match.join(",")} Thousands`;
    }

    // Step 7: If no pattern matches, return the original number with decimal (if present)
    return `${numStr}`;
};