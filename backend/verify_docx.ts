import { generateDocument } from './src/services/documentService';
import fs from 'fs';

const mockPlan: any = {
    id: 1,
    growthRate: 0.05,
    priceGrowthRate: 0.03,
    discountRate: 0.1,
    inflationRate: 0.02,
    salaryIncreaseRate: 0.04,
    van: 15400.50,
    tir: 0.25,
    benefitCostRatio: 1.45,
    paybackPeriod: "2 años, 3 meses",
    financialConclusion: "El proyecto es altamente viable con un VAN positivo y una TIR del 25%. Las condiciones de mercado favorecen el crecimiento sostenido.",
    financialRecommendations: "Se recomienda diversificar los canales de comercialización digital para captar el segmento joven.",
    financialRisks: "Inestabilidad en los precios de los insumos importados.",
    entrepreneurship: {
        id: 1,
        name: "Proyecto Refinado Académico Final",
        brand: "Marca Pro Institucional",
        sector: "Servicios Tecnológicos",
        description: "Descripción narrativa extensa para el perfil de proyecto que cumple con los estándares más exigentes de la academia ecuatoriana.",
        mainActivity: "Desarrollo de software y consultoría estratégica en transformación digital.",
        productiveFocus: "Enfoque en la eficiencia operativa mediante el uso de inteligencia artificial.",
        representativeName: "Jonathan Cañar",
        representativeId: "1729384756",
        representativeGender: "Masculino",
        representativeNationality: "Ecuatoriana",
        representativeBirthDate: new Date("1990-05-15"),
        representativeAge: 35,
        addressProvince: "Pichincha",
        addressCanton: "Quito",
        addressParish: "Iñaquito",
        addressComplete: "Av. Amazonas N-24 y Eloy Alfaro",
        email: "jcanar89@gmail.com",
        phone: "022555666",
        mobile: "0998887776",
        hasRuc: true,
        rucNumber: "1729384756001",
        activitiesStartDate: new Date("2024-01-01"),
        valueProposition: "Transformación digital acelerada con costos optimizados para PYMES.",
        differentiation: "Metodología propia basada en estándares internacionales adaptados al mercado local.",
        customerBenefits: "Incremento de la eficiencia en un 20% y reducción de costos operativos en el primer año.",
        communicationChannels: "Webinars semanales, LinkedIn corporativo y boletines técnicos.",
        commercializationChannels: "Consultoría directa personalizada y Marketplace de servicios.",
        supplyChainMode: "TEXT",
        supplyChainProviders: "Amazon Web Services, GitHub, Microsoft.",
        supplyChainProduction: "Ciclos de desarrollo ágil con control de calidad automatizado.",
        supplyChainStorage: "Infraestructura en la nube con redundancia geográfica.",
        supplyChainDistribution: "Despliegue continuo (CI/CD) directamente al entorno del cliente.",
        supplyChainClient: "Empresas del sector de servicios y comercio a nivel nacional.",
        user: { name: "Jonathan", email: "jcanar89@gmail.com" },
        segments: [{ name: "Segmento PYMES", characteristics: "Empresas de 10-50 empleados buscando digitalización." }],
        partners: [{ name: "GAD Municipal de Quito" }],
        team: []
    },
    demands: [
        { productName: "Consultoría Estratégica", monthlyDemand: 4, unitPrice: 1200 },
        { productName: "Mantenimiento Cloud", monthlyDemand: 10, unitPrice: 300 }
    ],
    equipments: [
        { description: "Servidor Dedicado", quantity: 1, unitPrice: 2500, financingSource: "Fondos Propios" },
        { description: "Estaciones de Trabajo", quantity: 3, unitPrice: 1200, financingSource: "Préstamo Bancario" }
    ],
    unitCosts: [
        { productName: "Licencia Anual", monthlyQuantity: 5, unitCost: 150 }
    ],
    provisions: [
        { item: "Marketing Digital", monthlyQuantity: 1, unitPrice: 500 }
    ],
    financingItems: [
        { concept: "Préstamo Pymes", amount: 10000, source: "Banco Pichincha" }
    ],
    projections: [
        { year: 1, revenue: 50000, ebit: 12000, netProfit: 10000, cashFlow: 15000 },
        { year: 2, revenue: 65000, ebit: 18000, netProfit: 15000, cashFlow: 20000 },
        { year: 3, revenue: 80000, ebit: 25000, netProfit: 22000, cashFlow: 28000 },
        { year: 4, revenue: 100000, ebit: 35000, netProfit: 30000, cashFlow: 38000 },
        { year: 5, revenue: 130000, ebit: 50000, netProfit: 45000, cashFlow: 55000 }
    ]
};

async function test() {
    try {
        console.log("Generating finalized academic document...");
        const buffer = await generateDocument(mockPlan);
        fs.writeFileSync('test_final_academico.docx', buffer);
        console.log("Success! File saved as test_final_academico.docx");
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
