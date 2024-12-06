export const PIN_RULES = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 11
} as const;

export function validatePin(pin: string): { isValid: boolean; error?: string } {
  // Check if PIN contains only numbers
  if (!/^\d+$/.test(pin)) {
    return { isValid: false, error: 'PIN must contain only numbers' };
  }

  // Check length
  if (pin.length < PIN_RULES.MIN_LENGTH || pin.length > PIN_RULES.MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `PIN must be between ${PIN_RULES.MIN_LENGTH} and ${PIN_RULES.MAX_LENGTH} digits` 
    };
  }

  return { isValid: true };
}