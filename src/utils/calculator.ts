export const getLevel = (exp: number): number => {
    return Math.round((exp / 10) ** (1 / 2));
};

export const getBonusExp = (elapsed: number): number => {
    const a = 1000;
    const b = (-1140 + (4560 * a + 1299600) ** 0.5) / 19;
    const c = (315 - (285 * a + 66564) ** 0.5) / 60;
    const f = (x: number) => a / (x * (1 / 60000) + b) + c;
    return f(elapsed) > 0 && f(elapsed) <= 20 ? Math.round(f(elapsed)) : 0;
};
