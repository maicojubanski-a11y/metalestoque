# ==============================================================================
# GERADOR DE PLANILHA DE DEMONSTRAÇÃO INDUSTRIAL: 3.000 MODELOS / 90.000 UNIDADES
# Cria um arquivo CSV realista para teste de carga imediato no MetalEstoque PRO
# ==============================================================================

$OutputFile = Join-Path $PSScriptRoot "estoque_3000_modelos_90k_unidades.csv"
if (-not $PSScriptRoot) { $OutputFile = "estoque_3000_modelos_90k_unidades.csv" }

$Lines = [System.Collections.Generic.List[string]]::new()
$Lines.Add("CODIGO;DESCRICAO;CATEGORIA;UNIDADE;DIMENSOES;MATERIAL;CORRIDA;LOCALIZACAO;ESTOQUE_ATUAL;ESTOQUE_MINIMO;ESTOQUE_MAXIMO;CUSTO_UNITARIO;FORNECEDOR;OBSERVACOES")

$Categorias = @("chapas", "tubos_perfis", "solda_corte", "usinagem", "fixadores", "quimicos_oleos", "epi")
$Materiais = @("Aço SAE 1020", "Aço SAE 1045", "Aço ASTM A36", "Inox AISI 304", "Alumínio 5052", "Aço Ferramenta D2")
$Locais = @("Pátio Chapas Vão", "Prateleira Tubos Cantiléver", "Armário Ferramentaria Gaveta", "Estante Fixadores Box", "Doca Almoxarifado")
$Fornecedores = @("Aços Gerdau Distribuidora", "Usiminas S/A", "Aperam South America", "Tubos Açotubo", "Ciser Fixadores", "Sandvik Coromant", "ESAB Soldas")

$TotalUnits = 0
$TargetItems = 3000
$AvgUnitsPerItem = 30 # 3000 * 30 = 90.000 unidades!

Write-Host "Gerando 3.000 modelos industriais somando ~90.000 unidades..." -ForegroundColor Cyan

for ($i = 1; $i -le $TargetItems; $i++) {
    $cat = $Categorias[$i % $Categorias.Count]
    $mat = $Materiais[$i % $Materiais.Count]
    $forn = $Fornecedores[$i % $Fornecedores.Count]
    $loc = "$($Locais[$i % $Locais.Count]) $([math]::Floor($i / 50) + 1)"
    $corrida = "USINA-$(10000 + ($i * 7) % 89999)"
    
    # Quantidade com variação em torno da média para bater ~90k
    $qtd = [math]::Max(1, [math]::Round(15 + ($i * 13) % 35))
    $min = [math]::Max(5, [math]::Round($qtd * 0.3))
    $max = [math]::Round($qtd * 2.5)
    $preco = [math]::Round(12.50 + (($i * 17) % 450) + (($i % 10) * 0.45), 2)
    
    $sku = ""
    $desc = ""
    $dim = ""
    $un = "un"

    if ($cat -eq "fixadores") {
        $diam = 4 + (($i % 14) * 2) # M4 a M30
        $comp = 10 + (($i % 20) * 5) # 10mm a 110mm
        $sku = "FIX-PAR-M$($diam)X$($comp)-$($i.ToString('0000'))"
        $desc = "Parafuso Sextavado Aço 8.8 M$($diam) x $($comp)mm Zincado"
        $dim = "M$($diam) x $($comp) mm"
        $un = "cx"
    } elseif ($cat -eq "chapas") {
        $esp = 0.8 + (($i % 25) * 1.5)
        $sku = "CHP-ESP-$([math]::Round($esp,1))MM-$($i.ToString('0000'))"
        $desc = "Chapa Metálica $mat Esp. $([math]::Round($esp,2))mm"
        $dim = "$([math]::Round($esp,2)) x 1200 x 3000 mm"
        $un = "chapa"
        $qtd = [math]::Max(1, [math]::Round($qtd / 3)) # menos chapas em unidades
    } elseif ($cat -eq "tubos_perfis") {
        $de = 20 + (($i % 20) * 5)
        $sku = "TUB-PER-$($de)MM-$($i.ToString('0000'))"
        $desc = "Tubo Estrutural Redondo Industrial Ø $($de)mm x 2.25mm"
        $dim = "Ø $($de)mm x 2.25mm x 6000mm"
        $un = "barra"
    } elseif ($cat -eq "usinagem") {
        $sku = "USI-FER-$($i.ToString('0000'))"
        $desc = "Inserto / Fresa de Usinagem Industrial Mod. $mat Série $i"
        $dim = "Padrão ISO $i"
        $un = "cx"
    } else {
        $sku = "IND-MAT-$($i.ToString('0000'))"
        $desc = "Insumo / Componente Industrial Especializado Modelo $i"
        $dim = "Conforme Norma Técnica"
        $un = "un"
    }

    $TotalUnits += $qtd
    $precoStr = $preco.ToString("0.00", [System.Globalization.CultureInfo]::InvariantCulture)
    $Lines.Add("$sku;$desc;$cat;$un;$dim;$mat;$corrida;$loc;$qtd;$min;$max;$precoStr;$forn;Cadastro de carga massiva.")
}

[System.IO.File]::WriteAllLines($OutputFile, $Lines, [System.Text.Encoding]::UTF8)

Write-Host "Arquivo gerado com sucesso: $OutputFile" -ForegroundColor Green
Write-Host "Total de Modelos: $TargetItems" -ForegroundColor Yellow
Write-Host "Total de Unidades Somadas: $TotalUnits unidades!" -ForegroundColor Green
