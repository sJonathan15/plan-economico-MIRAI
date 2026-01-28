import fs from "fs";
import path from "path";
import {
    AlignmentType,
    BorderStyle,
    Document,
    ImageRun,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    VerticalAlign,
    WidthType,
    PageBreak,
    TableBorders,
} from "docx";

/* ======================================================
   INTERFACES
====================================================== */

export interface PlanData {
    id: number;
    growthRate: number;
    priceGrowthRate: number;
    discountRate: number;
    inflationRate: number;
    salaryIncreaseRate: number;
    van: number;
    tir: number;
    benefitCostRatio: number;
    paybackPeriod: string;
    financialConclusion: string;
    financialRecommendations?: string | null;
    financialRisks?: string | null;
    totalCost: number;
    netProfit: number;
    conclusions?: string | null;
    entrepreneurship: {
        id: number;
        name: string;
        brand?: string | null;
        logoUrl?: string | null;
        representativeName?: string | null;
        representativeId?: string | null;
        representativeGender?: string | null;
        representativeNationality?: string | null;
        representativeBirthDate?: Date | null;
        representativeAge?: number | null;
        addressProvince?: string | null;
        addressCanton?: string | null;
        addressParish?: string | null;
        addressComplete?: string | null;
        email?: string | null;
        phone?: string | null;
        mobile?: string | null;
        hasRuc?: boolean | null;
        rucNumber?: string | null;
        activitiesStartDate?: Date | null;
        sector: string;
        user: { name: string; email: string };
        team: any[];
        partners: any[];
        segments: any[];
    };
    // Section 1: Business Description
    businessDescription: string;
    mainActivity: string;
    productiveFocus: string;
    socialImpact: string;

    // Section 2: Value Proposition
    valueProposition: string;
    differentiation: string;
    customerBenefits: string;

    // Section 4 & 5: Channels
    communicationChannels: string;
    commercializationChannels: string;

    // Section 8: Supply Chain
    supplyChainMode: string;
    supplyChainProviders: string;
    supplyChainProduction: string;
    supplyChainStorage: string;
    supplyChainDistribution: string;
    supplyChainClient: string;
    supplyChainImageUrl: string;

    images: any[];
    demands: any[];
    equipments: any[];
    unitCosts: any[];
    totalMonthlyUnitCost: number;
    totalAnnualUnitCost: number;
    provisions: any[];
    totalGeneralProvisions: number;
    financingItems: any[];
    projections: any[];
}

/* ======================================================
   CONSTANTS & HELPERS
====================================================== */

const FONT = "Times New Roman";
const SIZE_NORMAL = 24; // 12pt
const SIZE_TITLE = 28; // 14pt
const LINE_15 = 360;

/**
 * Sanitizes any value for Word safety.
 */
const safeText = (v: any): string => {
    if (v === null || v === undefined || v === "") return "N/A";
    if (typeof v === "number" && isNaN(v)) return "0";
    if (v instanceof Date) return v.toLocaleDateString("es-EC");
    return String(v);
};

/**
 * Creates a paragraph with text and formatting.
 */
const createPara = (text: any, options: { bold?: boolean; italic?: boolean; size?: number; align?: any; spacing?: any } = {}) =>
    new Paragraph({
        alignment: options.align || AlignmentType.JUSTIFIED,
        spacing: typeof options.spacing === "number" ? { line: options.spacing } : (options.spacing || { line: LINE_15 }),
        children: [
            new TextRun({
                text: safeText(text),
                bold: !!options.bold,
                italics: !!options.italic,
                font: FONT,
                size: options.size || SIZE_NORMAL,
            }),
        ],
    });

/**
 * Standard Header for Sections
 */
const createSectionTitle = (num: string, text: any) =>
    new Paragraph({
        spacing: { before: 400, after: 200 },
        children: [
            new TextRun({
                text: `${num}. ${safeText(text).toUpperCase()}`,
                bold: true,
                font: FONT,
                size: SIZE_NORMAL,
            }),
        ],
    });

/**
 * Standard 2-Column Row for uniformity
 */
const createTwoColRow = (k: string, v: any, options: { head?: boolean; vIsImg?: ImageRun | null; imgAlign?: any } = {}) =>
    new TableRow({
        children: [
            new TableCell({
                width: { size: 40, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                shading: options.head ? { fill: "D9D9D9" } : { fill: "F2F2F2" },
                children: [
                    new Paragraph({
                        children: [new TextRun({ text: safeText(k), bold: true, font: FONT, size: 20 })],
                    }),
                ],
            }),
            new TableCell({
                width: { size: 60, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                children: options.vIsImg
                    ? [new Paragraph({ alignment: options.imgAlign || AlignmentType.CENTER, children: [options.vIsImg] })]
                    : [
                        new Paragraph({
                            children: [new TextRun({ text: safeText(v), font: FONT, size: 20 })],
                        }),
                    ],
            }),
        ],
    });

/**
 * Format currency
 */
const formatPrice = (v: any) => {
    const n = parseFloat(v);
    return isNaN(n) ? "$ 0.00" : "$ " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatPriceEs = (v: any) => {
    const n = parseFloat(v);
    return isNaN(n) ? "$ 0,00" : "$ " + n.toFixed(2).replace(".", ",");
};

/**
 * Format Percent
 */
const formatPct = (v: any) => {
    const n = parseFloat(v);
    return isNaN(n) ? "0.00%" : (n * 100).toFixed(2) + "%";
};

/**
 * Format Percent with Spanish comma separator
 */
const formatPctEs = (v: any) => {
    const n = parseFloat(v);
    return isNaN(n) ? "0,00%" : (n * 100).toFixed(2).replace(".", ",") + "%";
};

/**
 * Generates academic conclusions based on financial indicators.
 */
const generateAcademicConclusions = (plan: PlanData) => {
    const { van, tir, discountRate, benefitCostRatio, paybackPeriod } = plan;
    const isViable = van > 0 && tir > (discountRate || 0);

    // Paragraph 1: Financial Analysis
    let p1 = `El análisis financiero revela que el proyecto presenta un Valor Actual Neto (VAN) de ${formatPriceEs(van)} y una Tasa Interna de Retorno (TIR) del ${formatPctEs(tir)}. `;
    if (isViable) {
        p1 += `Dado que el VAN es positivo y la TIR supera la tasa de descuento establecida del ${formatPctEs(discountRate)}, se determina que el proyecto es financieramente viable y capaz de generar valor económico por encima de las expectativas iniciales. `;
    } else {
        p1 += `Debido a que el VAN es inferior a cero o la TIR no supera la tasa de descuento del ${formatPctEs(discountRate)}, se concluye que, bajo las premisas actuales, el proyecto no alcanza el umbral de rentabilidad mínima exigido, lo que compromete su viabilidad financiera a largo plazo. `;
    }
    p1 += `Asimismo, la relación Beneficio/Costo de ${safeText(benefitCostRatio)} indica la eficiencia en la utilización de los recursos invertidos.`;

    // Paragraph 2: Risk and Recovery
    let p2 = `En términos de recuperación de la inversión, el Periodo de Recuperación (PR) se estima en ${safeText(paybackPeriod)}. `;
    if (parseFloat(paybackPeriod) > 5) {
        p2 += `Este horizonte temporal de recuperación se considera extenso, lo que incrementa el perfil de riesgo por la exposición prolongada a variables del mercado y posibles fluctuaciones en los flujos de caja operativos. `;
    } else {
        p2 += `Este periodo refleja una recuperación eficiente de la inversión inicial, reduciendo la incertidumbre y fortaleciendo la liquidez del emprendimiento en el mediano plazo. `;
    }
    p2 += `Se identifican riesgos asociados a la volatilidad de los costos operativos y la estabilidad de la demanda proyectada, factores críticos para la sostenibilidad del flujo de caja.`;

    // Paragraph 3: Recommendations
    let p3 = "Para fortalecer la posición competitiva y financiera del negocio, se recomienda ";
    if (isViable) {
        p3 += "mantener un control riguroso de los costos variables, diversificar los canales de comercialización y considerar la reinversión de excedentes en la optimización de procesos productivos. ";
    } else {
        p3 += "revaluar la estructura de costos fijos, optimizar la estrategia de precios de venta y explorar fuentes de financiamiento alternativas con menores tasas de interés para mejorar los indicadores de rentabilidad. ";
    }
    p3 += "Es fundamental establecer un sistema de monitoreo constante de los indicadores financieros para realizar ajustes oportunos frente a desviaciones presupuestarias.";

    // Disclaimer
    const disclaimer = "El presente informe ha sido elaborado con base en la información proporcionada por el emprendedor, quien es responsable de la veracidad de los datos ingresados. La institución no se responsabiliza por posibles errores, omisiones o alteraciones que puedan afectar los resultados del análisis financiero.";

    return [
        createPara(p1, { align: AlignmentType.JUSTIFIED }),
        createPara(p2, { align: AlignmentType.JUSTIFIED }),
        createPara(p3, { align: AlignmentType.JUSTIFIED }),
        new Paragraph({ spacing: { before: 400 } }),
        createPara(disclaimer, { bold: true, italic: true, size: 20, align: AlignmentType.CENTER })
    ];
};

/* ======================================================
   DOCUMENT GENERATOR
====================================================== */

export const generateDocument = async (plan: PlanData): Promise<Buffer> => {
    const ent = plan.entrepreneurship;

    // LOGO LOADING
    let coverLogo: ImageRun | null = null;
    let tableLogo: ImageRun | null = null;
    let logoBuffer: Buffer | null = null;

    if (ent.logoUrl) {
        try {
            const cleanPath = ent.logoUrl.replace(/^\/api\//, "").replace(/^\//, "");
            const logoPath = path.join(__dirname, "../../", cleanPath);

            if (fs.existsSync(logoPath)) {
                logoBuffer = fs.readFileSync(logoPath);

                coverLogo = new ImageRun({
                    data: logoBuffer,
                    transformation: { width: 220, height: 220 },
                    type: "png",
                } as any);

                tableLogo = new ImageRun({
                    data: logoBuffer,
                    transformation: { width: 50, height: 50 },
                    type: "png",
                } as any);
            }
        } catch (e) {
            console.error("Error loading logo:", e);
        }
    }

    const content: (Paragraph | Table)[] = [
        /* ================= PÁGINA 1: DATOS GENERALES ================= */
        createPara("PERFIL DE PROYECTO", { bold: true, size: SIZE_TITLE, align: AlignmentType.CENTER }),
        createPara(ent.name, { bold: true, size: SIZE_TITLE, align: AlignmentType.CENTER }),

        // LOGO – PORTADA
        coverLogo
            ? new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [coverLogo] })
            : createPara("[LOGO DEL EMPRENDIMIENTO]", { align: AlignmentType.CENTER, bold: true }),

        new Paragraph({ spacing: { before: 200 } }),

        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                createTwoColRow("Nombre del Proyecto", ent.name),
                createTwoColRow("Marca - Logotipo", tableLogo ? "" : "N/A", { vIsImg: tableLogo, imgAlign: AlignmentType.LEFT }),
                createTwoColRow("Nombre del Representante", ent.representativeName),
                createTwoColRow("Cédula", ent.representativeId),
                createTwoColRow("Género", ent.representativeGender),
                createTwoColRow("Nacionalidad", ent.representativeNationality),
                createTwoColRow("Fecha de Nacimiento", ent.representativeBirthDate),
                createTwoColRow("Edad", ent.representativeAge),
                createTwoColRow("Provincia", ent.addressProvince),
                createTwoColRow("Cantón", ent.addressCanton),
                createTwoColRow("Parroquia", ent.addressParish),
                createTwoColRow("Dirección Completa", ent.addressComplete),
                createTwoColRow("Correo Electrónico", ent.user.email),
                createTwoColRow("Teléfono Convencional", ent.phone),
                createTwoColRow("Teléfono Celular", ent.mobile),
                createTwoColRow("Dispone de RUC", ent.hasRuc ? "Sí" : "No"),
                ...(ent.hasRuc ? [createTwoColRow("Número de RUC", ent.rucNumber)] : []),
                createTwoColRow("Fecha de Inicio de Actividades", ent.activitiesStartDate),
            ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 2: ÍNDICE ================= */
        createPara("CONTENIDO", { bold: true, align: AlignmentType.CENTER }),
        new Paragraph({ spacing: { before: 200 } }),
        ...[
            "1. Descripción del Negocio",
            "2. Propuesta de Valor (Canvas)",
            "3. Equipo",
            "4. Canales de Comunicación (Canvas)",
            "5. Canales de Comercialización (Canvas)",
            "6. Cadena de Suministro",
            "7. Estructura de Costos",
            "8. Análisis Financiero",
            "9. Conclusiones",
            "10. Anexos",
        ].map((txt) =>
            new Paragraph({
                spacing: { line: LINE_15 },
                children: [
                    new TextRun({ text: txt, font: FONT }),
                    new TextRun({ text: " ............................................................................................ ", font: FONT }),
                ],
            })
        ),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 3: DESCRIPCIÓN ================= */
        createSectionTitle("1", "DESCRIPCIÓN DEL NEGOCIO"),
        createPara(plan.businessDescription),
        createPara(plan.mainActivity),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 4: PROPUESTA DE VALOR ================= */
        createSectionTitle("2", "PROPUESTA DE VALOR"),
        createPara(plan.valueProposition),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 5: EQUIPO ================= */
        createSectionTitle("3", "EQUIPO"),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["Nº", "Nombre y Apellido", "Experiencia", "Rol"].map(
                        (h) =>
                            new TableCell({
                                shading: { fill: "D9D9D9" },
                                children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, font: FONT, size: 20 })] })],
                            })
                    ),
                }),
                ...(ent.team || []).map(
                    (m: any, i: number) =>
                        new TableRow({
                            children: [String(i + 1), m.name, m.experience, m.role].map(
                                (c) =>
                                    new TableCell({
                                        children: [new Paragraph({ children: [new TextRun({ text: safeText(c), font: FONT, size: 20 })] })],
                                    })
                            ),
                        })
                ),
            ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 6: CANALES ================= */
        createSectionTitle("4", "CANALES DE COMUNICACIÓN"),
        createPara(plan.communicationChannels),

        createSectionTitle("5", "CANALES DE COMERCIALIZACIÓN"),
        createPara(plan.commercializationChannels),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 7: CADENA DE SUMINISTRO ================= */
        createSectionTitle("6", "CADENA DE SUMINISTRO"),
        ...(((): (Paragraph | Table)[] => {
            // 1. Prioridad Imagen
            if (plan.supplyChainMode === "IMAGE" && plan.supplyChainImageUrl) {
                try {
                    const cleanPath = plan.supplyChainImageUrl.replace(/^\/api\//, "").replace(/^\//, "");
                    const imgPath = path.join(__dirname, "../../", cleanPath);

                    if (fs.existsSync(imgPath)) {
                        return [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new ImageRun({
                                        data: fs.readFileSync(imgPath),
                                        transformation: { width: 450, height: 300 },
                                        type: "png",
                                    } as any),
                                ],
                            }),
                        ];
                    }
                } catch (e) {
                    console.error("Error loading supply chain image:", e);
                }
            }

            // 2. Prioridad Tabla Textual (Solo campos llenos)
            const scRows = [
                { label: "Proveedores", value: plan.supplyChainProviders },
                { label: "Producción", value: plan.supplyChainProduction },
                { label: "Almacenamiento", value: plan.supplyChainStorage },
                { label: "Distribución", value: plan.supplyChainDistribution },
                { label: "Cliente Final", value: plan.supplyChainClient },
            ].filter(row => row.value && String(row.value).trim() !== "" && String(row.value).toUpperCase() !== "N/A");

            if (scRows.length > 0) {
                return [
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: scRows.map(r => createTwoColRow(r.label, r.value)) as TableRow[],
                    }),
                ];
            }

            // 3. Fallback: Sin información
            return [createPara("No se ha definido la cadena de suministro para este plan.")];
        })()),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINAS 8+: COSTOS Y FINANZAS ================= */
        createSectionTitle("7", "ESTRUCTURA DE COSTOS"),

        createSectionTitle("7.1", "DATOS GENERALES PARA EL ÁREA FINANCIERA"),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["VARIABLE", "INDICADOR"].map(
                        (h) => new TableCell({ shading: { fill: "D9D9D9" }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, font: FONT, size: 20 })] })] })
                    ),
                }),
                createTwoColRow("TASA DE CRECIMIENTO DE LA PRODUCCIÓN", formatPctEs(plan.growthRate)),
                createTwoColRow("TASA DE CRECIMIENTO DEL PRECIO DE VENTA AL PÚBLICO", formatPctEs(plan.priceGrowthRate)),
                createTwoColRow("TASA DE DESCUENTO", formatPctEs(plan.discountRate)),
                createTwoColRow("TASA DE INFLACIÓN", formatPctEs(plan.inflationRate)),
                createTwoColRow("TASA DE INCREMENTO DE SUELDO Y SALARIOS", formatPctEs(plan.salaryIncreaseRate)),
            ],
        }),

        new Paragraph({ spacing: { before: 200 } }),
        createSectionTitle("7.2", "COSTOS UNITARIOS DE PRODUCCIÓN"),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["PRODUCTO O SERVICIO", "CANT. MENSUAL", "COSTO UNITARIO", "COSTO TOTAL"].map(
                        (h) => new TableCell({ shading: { fill: "D9D9D9" }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
                    ),
                }),
                ...plan.unitCosts.map(
                    (u) =>
                        new TableRow({
                            children: [u.productName, String(u.monthlyQuantity), formatPriceEs(u.unitCost), formatPriceEs(u.total)].map(
                                (c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: safeText(c), size: 20 })] })] })
                            ),
                        })
                ),
            ],
        }),

        new Paragraph({ spacing: { before: 100 } }),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "COSTO TOTAL MENSUAL", bold: true, size: 20 })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: formatPriceEs(plan.totalMonthlyUnitCost), bold: true, size: 20 })] })] }),
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "COSTO TOTAL ANUAL (12 MESES)", bold: true, size: 20 })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: formatPriceEs(plan.totalAnnualUnitCost), bold: true, size: 20 })] })] }),
                    ]
                }),
            ]
        }),

        new Paragraph({ spacing: { before: 200 } }),
        createPara("Detalle de Demanda Mensual:", { bold: true }),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["Producto", "Demanda", "PVP", "Total"].map(
                        (h) => new TableCell({ shading: { fill: "D9D9D9" }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
                    ),
                }),
                ...plan.demands.map(
                    (d) =>
                        new TableRow({
                            children: [d.productName, String(d.monthlyDemand), formatPrice(d.unitPrice), formatPrice(d.monthlyDemand * d.unitPrice)].map(
                                (c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: safeText(c), size: 20 })] })] })
                            ),
                        })
                ),
            ],
        }),

        new Paragraph({ spacing: { before: 200 } }),
        createPara("Equipos y Maquinaria:", { bold: true }),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["Descripción", "Cant.", "P. Unit", "Fuente"].map(
                        (h) => new TableCell({ shading: { fill: "D9D9D9" }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
                    ),
                }),
                ...plan.equipments.map(
                    (e: any) =>
                        new TableRow({
                            children: [e.description, String(e.quantity), formatPrice(e.unitPrice), e.financingSource || "Propio"].map(
                                (c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: safeText(c), size: 20 })] })] }),
                            ),
                        }),
                ),
            ],
        }),

        // --- Section 7.5: Provisones de Gastos Administrativos y Ventas ---
        createSectionTitle("7.5", "PROVISIONES DE GASTOS ADMINISTRATIVOS Y VENTAS"),
        ...(() => {
            const unitCosts = plan.unitCosts || [];
            const allProvisions = plan.provisions || [];

            if (unitCosts.length === 0) {
                return [createPara("No aplica o sin datos registrados.", { italic: true })];
            }

            const sections: (Paragraph | Table)[] = [];

            unitCosts.forEach((uc: any, idx: number) => {
                const productProvisions = allProvisions.filter(p =>
                    String(p.productId) === String(uc.wizardId)
                );
                const subTotal = productProvisions.reduce((acc, curr) => acc + (parseFloat(curr.monthlyQuantity) * parseFloat(curr.unitPrice)), 0);

                sections.push(
                    createPara(`PRODUCTO ${idx + 1}: ${uc.productName.toUpperCase()}`, { bold: true, size: 24, spacing: { before: 200, after: 100 } })
                );

                if (productProvisions.length === 0) {
                    sections.push(createPara("No hay insumos registrados para este producto.", { italic: true, spacing: { before: 100, after: 200 } }));
                } else {
                    sections.push(
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: [
                                        { text: "INSUMOS AL MES DEL PRODUCTO", w: 40 },
                                        { text: "UNIDAD", w: 15 },
                                        { text: "CANTIDAD", w: 15 },
                                        { text: "PRECIO UNITARIO", w: 15 },
                                        { text: "COSTO TOTAL", w: 15 }
                                    ].map(h => new TableCell({
                                        width: { size: h.w, type: WidthType.PERCENTAGE },
                                        shading: { fill: "D9D9D9" },
                                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h.text, bold: true, size: 20, font: FONT })] })],
                                    }))
                                }),
                                ...productProvisions.map(i => new TableRow({
                                    children: [
                                        new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: safeText(i.item), size: 20, font: FONT })] })] }),
                                        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: safeText(i.unit), size: 20, font: FONT })] })] }),
                                        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: safeText(String(i.monthlyQuantity)), size: 20, font: FONT })] })] }),
                                        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatPriceEs(i.unitPrice), size: 20, font: FONT })] })] }),
                                        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatPriceEs(parseFloat(i.monthlyQuantity.toString()) * parseFloat(i.unitPrice.toString())), size: 20, font: FONT })] })] }),
                                    ]
                                }))
                            ]
                        })
                    );
                }

                sections.push(
                    createPara(`COSTO TOTAL DEL PRODUCTO: ${formatPriceEs(subTotal)}`, { bold: true, size: 22, spacing: { before: 100, after: 200 } })
                );
            });

            // Single Global Total at the very end
            sections.push(
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 400, after: 400 },
                    children: [
                        new TextRun({
                            text: `TOTAL GENERAL DE PROVISIONES DE GASTOS ADMINISTRATIVOS Y VENTAS: ${formatPriceEs(plan.totalGeneralProvisions)}`,
                            bold: true,
                            size: 24,
                            font: FONT
                        }),
                    ],
                })
            );

            return sections;
        })(),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 9: ANÁLISIS FINANCIERO ================= */
        createSectionTitle("8", "ANÁLISIS FINANCIERO"),
        createPara("Proyección de Resultados (Resumen):", { bold: true }),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: ["Año", "Ingresos", "Utilidad Neta", "Flujo Caja"].map(
                        (h) => new TableCell({ shading: { fill: "D9D9D9" }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
                    ),
                }),
                ...plan.projections.map(
                    (prj) =>
                        new TableRow({
                            children: [String(prj.year), formatPrice(prj.revenue), formatPrice(prj.netProfit), formatPrice(prj.cashFlow)].map(
                                (c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: safeText(c), size: 20 })] })] })
                            ),
                        })
                ),
            ],
        }),

        new Paragraph({ spacing: { before: 200 } }),
        createPara("Indicadores de Rentabilidad:", { bold: true }),
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                createTwoColRow("Valor Actual Neto (VAN)", formatPrice(plan.van)),
                createTwoColRow("Tasa Interna de Retorno (TIR)", formatPct(plan.tir)),
                createTwoColRow("Relación Beneficio / Costo", safeText(plan.benefitCostRatio)),
                createTwoColRow("Periodo de Recuperación", safeText(plan.paybackPeriod)),
            ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 10: CONCLUSIONES ================= */
        createSectionTitle("9", "CONCLUSIONES"),
        ...generateAcademicConclusions(plan),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= PÁGINA 11: ANEXOS ================= */
        createSectionTitle("10", "ANEXOS Y EVIDENCIAS"),
        ...(plan.images && plan.images.length > 0
            ? plan.images.flatMap((img: any, idx: number) => {
                try {
                    const cleanPath = (img.imageUrl || img.url || "").replace(/^\/api\//, "").replace(/^\//, "");
                    const fullPath = path.join(__dirname, "../../", cleanPath);
                    if (fs.existsSync(fullPath)) {
                        return [
                            createPara(`Imagen ${idx + 1}`, { bold: true, align: AlignmentType.CENTER, spacing: 100 }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 100, after: 400 },
                                children: [
                                    new ImageRun({
                                        data: fs.readFileSync(fullPath),
                                        transformation: { width: 450, height: 320 },
                                        // Docx library handles types automatically but we can provide extension-based hint if needed
                                    } as any),
                                ],
                            }),
                        ];
                    }
                } catch (e) {
                    console.error(`Error processing image ${idx + 1}:`, e);
                }
                return [];
            })
            : [createPara("No se han adjuntado anexos para este plan.")]),

        new Paragraph({ children: [new PageBreak()] }),

        /* ================= FIRMAS ================= */
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "______________________________", font: FONT })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "FIRMA DEL EMPRENDEDOR", bold: true, font: FONT })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: safeText(ent.representativeName).toUpperCase(), font: FONT })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `${ent.addressCanton || "Ecuador"}, ${new Date().toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}`, font: FONT })],
        }),
    ];

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: FONT, size: SIZE_NORMAL },
                },
            },
        },
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 1440, bottom: 1440, left: 1700, right: 1440 },
                    },
                },
                children: content,
            },
        ],
    });

    return await Packer.toBuffer(doc);
};
