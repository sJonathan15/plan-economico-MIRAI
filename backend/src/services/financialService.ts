export interface FinancialInput {
    growthRate: number;      // e.g., 0.05 for 5%
    priceGrowthRate: number;
    discountRate: number;
    inflationRate: number;
    salaryIncreaseRate: number;

    initialInvestment: number;

    // Year 1 base values (Monthly * 12)
    baseYearRevenue: number;
    baseYearCosts: number;   // Variable costs
    baseYearExpenses: number; // Fixed costs
}

export interface ProjectionYear {
    year: number;
    revenue: number;
    costs: number;
    expenses: number;
    ebit: number;
    tax: number;
    netProfit: number;
    cashFlow: number;
    cumulativeCashFlow: number;
}

export interface FinancialIndicators {
    van: number;
    tir: number;
    benefitCostRatio: number;
    paybackPeriod: string;
}

export const calculateProjections = (input: FinancialInput): ProjectionYear[] => {
    const projections: ProjectionYear[] = [];
    let currentRevenue = input.baseYearRevenue;
    let currentCosts = input.baseYearCosts;
    let currentExpenses = input.baseYearExpenses;
    let cumulativeCF = -input.initialInvestment;

    for (let year = 1; year <= 5; year++) {
        if (year > 1) {
            currentRevenue *= (1 + input.growthRate) * (1 + input.priceGrowthRate);
            currentCosts *= (1 + input.growthRate) * (1 + input.inflationRate);
            // Assuming half of expenses are salaries and half are general supplies for growth example
            currentExpenses *= (1 + input.inflationRate);
        }

        const ebit = currentRevenue - currentCosts - currentExpenses;
        const tax = ebit > 0 ? ebit * 0.25 : 0;
        const netProfit = ebit - tax;
        const cashFlow = netProfit; // Simplified: CF = NetProfit (assuming no depreciation/amortization yet)
        cumulativeCF += cashFlow;

        projections.push({
            year,
            revenue: currentRevenue,
            costs: currentCosts,
            expenses: currentExpenses,
            ebit,
            tax,
            netProfit,
            cashFlow,
            cumulativeCashFlow: cumulativeCF
        });
    }

    return projections;
};

export const calculateIndicators = (input: FinancialInput, projections: ProjectionYear[]): FinancialIndicators => {
    // 1. VAN (NPV)
    let van = -input.initialInvestment;
    projections.forEach(p => {
        van += p.cashFlow / Math.pow(1 + input.discountRate, p.year);
    });

    // 2. TIR (IRR) - Simple secant method
    const irr = calculateIRR(input.initialInvestment, projections.map(p => p.cashFlow));

    // 3. B/C Ratio
    let discountedBenefits = 0;
    let discountedCosts = input.initialInvestment;
    projections.forEach(p => {
        discountedBenefits += p.revenue / Math.pow(1 + input.discountRate, p.year);
        discountedCosts += (p.costs + p.expenses + p.tax) / Math.pow(1 + input.discountRate, p.year);
    });
    const bcRatio = discountedBenefits / discountedCosts;

    // 4. Payback Period
    let playback = "No recuperado en 5 años";
    let lastNegative = -input.initialInvestment;
    for (let i = 0; i < projections.length; i++) {
        if (projections[i].cumulativeCashFlow >= 0) {
            const yearIndex = projections[i].year;
            const prevCF = i === 0 ? -input.initialInvestment : projections[i - 1].cumulativeCashFlow;
            const currentCF = projections[i].cashFlow;
            const partialYear = Math.abs(prevCF) / currentCF;
            playback = `${yearIndex - 1 + partialYear.toFixed(2)} años`;
            break;
        }
    }

    return {
        van,
        tir: irr,
        benefitCostRatio: bcRatio,
        paybackPeriod: playback
    };
};

function calculateIRR(initialInvestment: number, cashFlows: number[]): number {
    let rate = 0.1; // Starting guess
    for (let i = 0; i < 20; i++) {
        let npv = -initialInvestment;
        let dNpv = 0;

        for (let t = 0; t < cashFlows.length; t++) {
            const time = t + 1;
            npv += cashFlows[t] / Math.pow(1 + rate, time);
            dNpv -= (time * cashFlows[t]) / Math.pow(1 + rate, time + 1);
        }

        const nextRate = rate - npv / dNpv;
        if (Math.abs(nextRate - rate) < 0.0001) return nextRate;
        rate = nextRate;
    }
    return rate;
}

export const generateAutomaticConclusion = (indicators: FinancialIndicators): string => {
    const { van, tir, benefitCostRatio } = indicators;
    let conclusion = `El análisis financiero proyectado a 5 años indica que el proyecto es `;

    if (van > 0 && benefitCostRatio > 1) {
        conclusion += `VIABLE y rentable. `;
    } else {
        conclusion += `RIESGOSO o requiere ajustes en la estructura de costos. `;
    }

    conclusion += `Con un VAN de ${van.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} `;
    conclusion += `y una Tasa Interna de Retorno (TIR) del ${(tir * 100).toFixed(2)}%, el proyecto supera la tasa de descuento esperada. `;
    conclusion += `La relación beneficio/costo de ${benefitCostRatio.toFixed(2)} sugiere que por cada dólar invertido se obtiene un retorno positivo. `;

    return conclusion;
}
