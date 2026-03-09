# Prompt Optimization Suggestions

## Current Issue
The current prompt lists hundreds of specific field names (203KIndicator, Ability To Repay Loan Type, etc.), making it:
- Very long (~15,000+ characters)
- Expensive (high token usage)
- Potentially confusing for the LLM

## Recommended Approach

Instead of listing every possible field, use a category-based approach:

```python
prompt = f"""You are a financial documentation specialist.

Document Content:
{extracted_text}

Instructions:
Extract ALL financial entities from the document and organize them into these categories:

1. **Lender Information**: Name, address, contact details, NMLS ID, license numbers
2. **Borrower Information**: Names, SSN, DOB, contact details, employment info
3. **Loan Details**: Loan number, amount, interest rate, term, type, payment details
4. **Property Information**: Address, appraisal value, property type, legal description
5. **Dates**: Application date, closing date, maturity date, lock dates
6. **Financial Figures**: Down payment, closing costs, monthly payment, fees
7. **Additional Parties**: Co-borrowers, agents, appraisers, servicers

Return a JSON object with these categories. Include ALL fields found in the document, even if not explicitly listed above.

Format: {{"category": {{"field_name": "value"}}}}
"""
```

## Benefits
- 90% shorter prompt = 90% lower costs
- Clearer instructions for LLM
- Better extraction quality
- Captures unexpected fields
- Faster processing

## Implementation
Replace the current `extract_entities_from_model` function with the simplified version above.
