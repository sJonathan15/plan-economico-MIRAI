# Word Template Placeholder

This directory should contain `plan_template.docx`.

## Creating the Template

Since we cannot create a .docx file directly in code, you need to:

1. Create a Word document named `plan_template.docx`
2. Add the following placeholders (use curly braces: {{placeholder}}):

### Header Section
- {{user_name}} - Student name
- {{user_email}} - Student email
- {{project_name}} - Entrepreneurship name
- {{sector}} - Business sector
- {{description}} - Project description
- {{generation_date}} - Document generation date

### Investment Section
Title: "INVERSIÓN INICIAL"
- Table with columns: Concepto | Cantidad | Precio Unitario | Total
- Loop through {{#investment_items}}
  - {{name}} | {{quantity}} | {{unit_price}} | {{amount}}
- {{/investment_items}}
- **Total Inversión:** {{investment_total}}

### Fixed Costs Section
Title: "COSTOS FIJOS MENSUALES"
- Table with columns: Concepto | Monto
- Loop through {{#fixed_costs_items}}
  - {{name}} | {{amount}}
- {{/fixed_costs_items}}
- **Total Costos Fijos:** {{fixed_costs_total}}

### Variable Costs Section
Title: "COSTOS VARIABLES"
- Table with columns: Concepto | Costo por Unidad
- Loop through {{#variable_costs_items}}
  - {{name}} | {{amount}}
- {{/variable_costs_items}}
- **Total Costos Variables:** {{variable_costs_total}}

### Income Section
Title: "INGRESOS PROYECTADOS"
- Table with columns: Concepto | Monto Mensual
- Loop through {{#income_items}}
  - {{name}} | {{amount}}
- {{/income_items}}
- **Total Ingresos:** {{income_total}}

### Profitability Section
Title: "ANÁLISIS DE RENTABILIDAD"
- **Costo Total:** {{total_cost}}
- **Utilidad Neta:** {{net_profit}}
- **Margen de Utilidad:** {{profit_margin}}
- **ROI:** {{roi}}

## Template Example Structure

```
PLAN ECONÓMICO DE EMPRENDIMIENTO

Estudiante: {{user_name}}
Correo: {{user_email}}
Proyecto: {{project_name}}
Sector: {{sector}}
Fecha: {{generation_date}}

DESCRIPCIÓN DEL PROYECTO
{{description}}

[Continue with sections above...]
```

## Quick Start

For testing, you can use the provided sample template or create your own following the structure above.
