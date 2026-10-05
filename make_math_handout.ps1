$ErrorActionPreference = 'Stop'

$outDir = Join-Path $PSScriptRoot 'materials'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null
$docxPath = Join-Path $outDir 'Математика_7_класс_примеры_и_решения.docx'
$pdfPath = Join-Path $outDir 'Математика_7_класс_примеры_и_решения.pdf'

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $doc = $word.Documents.Add()
    $section = $doc.Sections.Item(1)
    $section.PageSetup.TopMargin = $word.CentimetersToPoints(1.7)
    $section.PageSetup.BottomMargin = $word.CentimetersToPoints(1.7)
    $section.PageSetup.LeftMargin = $word.CentimetersToPoints(1.8)
    $section.PageSetup.RightMargin = $word.CentimetersToPoints(1.5)

    $normal = $doc.Styles.Item(-1)
    $normal.Font.Name = 'Arial'
    $normal.Font.Size = 11
    $normal.ParagraphFormat.SpaceAfter = 5
    $normal.ParagraphFormat.LineSpacingRule = 0

    $h1 = $doc.Styles.Item(-2)
    $h1.Font.Name = 'Arial'
    $h1.Font.Size = 18
    $h1.Font.Bold = $true
    $h1.Font.Color = 0x783C16
    $h1.ParagraphFormat.SpaceBefore = 10
    $h1.ParagraphFormat.SpaceAfter = 6

    $h2 = $doc.Styles.Item(-3)
    $h2.Font.Name = 'Arial'
    $h2.Font.Size = 14
    $h2.Font.Bold = $true
    $h2.Font.Color = 0x9E5A20
    $h2.ParagraphFormat.SpaceBefore = 8
    $h2.ParagraphFormat.SpaceAfter = 4

    function Add-Text([string]$text, [string]$style = 'Normal', [bool]$bold = $false) {
        $p = $doc.Paragraphs.Add()
        $p.Range.Text = $text
        $styleId = switch ($style) {
            'Title' { -63 }
            'Subtitle' { -75 }
            'Heading 1' { -2 }
            'Heading 2' { -3 }
            default { -1 }
        }
        $p.Range.Style = $styleId
        $p.Range.Font.Bold = $bold
        $p.Range.InsertParagraphAfter()
        return $p
    }

    function Add-Rule([string]$title, [string]$body) {
        $table = $doc.Tables.Add($doc.Range($doc.Content.End - 1, $doc.Content.End - 1), 1, 1)
        $table.AllowAutoFit = $true
        $table.Borders.Enable = 1
        $cell = $table.Cell(1,1)
        $cell.Shading.BackgroundPatternColor = 0xEAF4FC
        $cell.Range.Text = "$title`r$body"
        $cell.Range.Font.Name = 'Arial'
        $cell.Range.Font.Size = 10.5
        $cell.Range.Paragraphs.Item(1).Range.Font.Bold = $true
        $cell.Range.ParagraphFormat.SpaceAfter = 3
        $doc.Range($doc.Content.End - 1, $doc.Content.End - 1).InsertParagraphAfter()
    }

    function Add-Example([string]$number, [string]$problem, [string[]]$steps, [string]$answer, [string]$check = '') {
        $p = Add-Text "Пример $number. $problem" 'Heading 2'
        $p.Range.ParagraphFormat.KeepWithNext = $true
        foreach ($step in $steps) {
            $sp = Add-Text $step
            $sp.LeftIndent = $word.CentimetersToPoints(0.5)
        }
        if ($check) {
            $cp = Add-Text "Проверка: $check"
            $cp.Range.Font.Italic = $true
            $cp.LeftIndent = $word.CentimetersToPoints(0.5)
        }
        $ap = Add-Text "Ответ: $answer" 'Normal' $true
        $ap.LeftIndent = $word.CentimetersToPoints(0.5)
        $ap.Range.Shading.BackgroundPatternColor = 0xD9F2E3
        $ap.Range.ParagraphFormat.SpaceAfter = 7
    }

    function Add-TaskList([string[]]$items) {
        foreach ($item in $items) {
            $p = Add-Text $item
            $p.Range.ParagraphFormat.LeftIndent = $word.CentimetersToPoints(0.4)
            $p.Range.ParagraphFormat.FirstLineIndent = $word.CentimetersToPoints(-0.4)
            $p.Range.ParagraphFormat.SpaceAfter = 4
        }
    }

    # Cover
    $p = Add-Text 'МАТЕМАТИКА • 7 КЛАСС' 'Title'
    $p.Range.Font.Name = 'Arial'
    $p.Range.Font.Size = 26
    $p.Range.Font.Bold = $true
    $p.Range.Font.Color = 0x783C16
    $p.Alignment = 1
    $p.SpaceBefore = 80
    $p.SpaceAfter = 18

    $p = Add-Text 'Линейные уравнения. Положительные и отрицательные числа' 'Subtitle'
    $p.Range.Font.Name = 'Arial'
    $p.Range.Font.Size = 18
    $p.Range.Font.Bold = $true
    $p.Alignment = 1
    $p.SpaceAfter = 24

    $p = Add-Text 'Правила • подробные решения • проверка • задания для тренировки • ответы'
    $p.Range.Font.Size = 12
    $p.Alignment = 1
    $p.Range.Shading.BackgroundPatternColor = 0xEAF4FC
    $p.SpaceAfter = 40

    $p = Add-Text 'Имя: ____________________________________________   Дата: ______________'
    $p.Alignment = 1
    $p.SpaceBefore = 80

    $p = Add-Text 'Как работать с материалом'
    $p.Range.Font.Bold = $true
    $p.Alignment = 1
    Add-Text '1. Прочитай правило.  2. Закрой решение и попробуй выполнить пример сам.  3. Сверь каждый шаг.  4. Выполни задания для тренировки.  5. Проверь ответы в конце.'

    $doc.Words.Last.InsertBreak(7)

    # Signed numbers
    Add-Text '1. Положительные и отрицательные числа' 'Heading 1'
    Add-Rule 'Главная идея' 'Положительные числа больше нуля, отрицательные — меньше нуля. На координатной прямой число, расположенное правее, всегда больше.'
    Add-Rule 'Модуль числа' '|a| — расстояние от числа a до нуля. Поэтому модуль всегда неотрицателен: |−8| = 8, |5| = 5, |0| = 0.'
    Add-Rule 'Сложение' 'Одинаковые знаки: складываем модули и сохраняем знак. Разные знаки: из большего модуля вычитаем меньший и ставим знак числа с большим модулем.'
    Add-Rule 'Вычитание' 'Заменяем вычитание сложением противоположного числа: a − b = a + (−b). Например, 7 − (−3) = 7 + 3.'
    Add-Rule 'Умножение и деление' 'Одинаковые знаки дают «+», разные знаки дают «−». Сначала определяем знак, затем считаем модули.'

    Add-Example '1' 'Сравнить числа −8 и −3.' @(
        'На координатной прямой число −8 находится левее числа −3.',
        'Число, расположенное левее, меньше.'
    ) '−8 < −3'

    Add-Example '2' 'Найти значение выражения |−12| − |5|.' @(
        '|−12| = 12, потому что расстояние от −12 до нуля равно 12.',
        '|5| = 5.',
        '12 − 5 = 7.'
    ) '7'

    Add-Example '3' 'Вычислить: −7 + (−5).' @(
        'Слагаемые имеют одинаковый знак «−».',
        'Складываем модули: 7 + 5 = 12.',
        'Сохраняем знак «−»: −12.'
    ) '−12'

    Add-Example '4' 'Вычислить: −15 + 9.' @(
        'Знаки разные. Сравниваем модули: 15 > 9.',
        'Вычитаем меньший модуль из большего: 15 − 9 = 6.',
        'Больший модуль у числа −15, значит результат отрицательный.'
    ) '−6'

    Add-Example '5' 'Вычислить: 6 − (−11).' @(
        'Заменяем вычитание сложением противоположного числа.',
        'Число, противоположное −11, равно 11.',
        '6 − (−11) = 6 + 11 = 17.'
    ) '17'

    Add-Example '6' 'Вычислить: −4 − 9.' @(
        '−4 − 9 = −4 + (−9).',
        'Складываем два отрицательных числа: −(4 + 9) = −13.'
    ) '−13'

    Add-Example '7' 'Вычислить: (−6) · 7 и (−48) : (−8).' @(
        '(−6) · 7: знаки разные, поэтому результат отрицательный; 6 · 7 = 42.',
        '(−48) : (−8): знаки одинаковые, поэтому результат положительный; 48 : 8 = 6.'
    ) '(−6) · 7 = −42; (−48) : (−8) = 6'

    Add-Example '8' 'Найти значение: −18 + 3 · (5 − 9).' @(
        'Сначала действие в скобках: 5 − 9 = −4.',
        'Затем умножение: 3 · (−4) = −12.',
        'Теперь сложение: −18 + (−12) = −30.'
    ) '−30'

    Add-Example '9' 'Утром температура была −7 °C. Днём она повысилась на 12 °C, а вечером понизилась на 5 °C. Какой стала температура?' @(
        'После повышения: −7 + 12 = 5 °C.',
        'После понижения: 5 − 5 = 0 °C.'
    ) '0 °C'

    $doc.Words.Last.InsertBreak(7)

    # Equations
    Add-Text '2. Линейные уравнения' 'Heading 1'
    Add-Rule 'Что такое корень уравнения' 'Корень — значение переменной, при котором равенство становится верным. Решить уравнение — значит найти все его корни или установить, что их нет.'
    Add-Rule 'Основное свойство' 'К обеим частям уравнения можно прибавить одно и то же число, вычесть одно и то же число, а также умножить или разделить обе части на одно и то же ненулевое число.'
    Add-Rule 'Удобный алгоритм' '1) Раскрой скобки. 2) Перенеси слагаемые с x в одну часть, числа — в другую, меняя знак. 3) Приведи подобные слагаемые. 4) Раздели на коэффициент при x. 5) Сделай проверку.'

    Add-Example '10' 'Решить уравнение: x + 7 = 19.' @(
        'Вычтем 7 из обеих частей:',
        'x + 7 − 7 = 19 − 7,',
        'x = 12.'
    ) 'x = 12' '12 + 7 = 19 — верно.'

    Add-Example '11' 'Решить уравнение: x − 8 = −13.' @(
        'Прибавим 8 к обеим частям:',
        'x − 8 + 8 = −13 + 8,',
        'x = −5.'
    ) 'x = −5' '−5 − 8 = −13 — верно.'

    Add-Example '12' 'Решить уравнение: −5x = 35.' @(
        'Разделим обе части на −5:',
        'x = 35 : (−5),',
        'x = −7.'
    ) 'x = −7' '−5 · (−7) = 35 — верно.'

    Add-Example '13' 'Решить уравнение: x : 4 = −6.' @(
        'Умножим обе части на 4:',
        'x = −6 · 4,',
        'x = −24.'
    ) 'x = −24' '−24 : 4 = −6 — верно.'

    Add-Example '14' 'Решить уравнение: 3x + 7 = 25.' @(
        'Вычтем 7 из обеих частей: 3x = 25 − 7.',
        '3x = 18.',
        'Разделим обе части на 3: x = 6.'
    ) 'x = 6' '3 · 6 + 7 = 18 + 7 = 25.'

    Add-Example '15' 'Решить уравнение: 5 − 2x = 17.' @(
        'Вычтем 5 из обеих частей: −2x = 17 − 5.',
        '−2x = 12.',
        'Разделим обе части на −2: x = −6.'
    ) 'x = −6' '5 − 2 · (−6) = 5 + 12 = 17.'

    Add-Example '16' 'Решить уравнение: 4(x − 3) = 2x + 10.' @(
        'Раскроем скобки: 4x − 12 = 2x + 10.',
        'Перенесём 2x влево, а −12 вправо: 4x − 2x = 10 + 12.',
        '2x = 22.',
        'x = 11.'
    ) 'x = 11' '4(11 − 3) = 32; 2 · 11 + 10 = 32.'

    Add-Example '17' 'Решить уравнение: 3(2x − 1) − 5 = 2(x + 4).' @(
        'Раскроем скобки: 6x − 3 − 5 = 2x + 8.',
        'Приведём подобные: 6x − 8 = 2x + 8.',
        'Перенесём: 6x − 2x = 8 + 8.',
        '4x = 16, значит x = 4.'
    ) 'x = 4' '3(8 − 1) − 5 = 16; 2(4 + 4) = 16.'

    Add-Example '18' 'Решить уравнение: x/3 + 5 = 9.' @(
        'Вычтем 5 из обеих частей: x/3 = 4.',
        'Умножим обе части на 3: x = 12.'
    ) 'x = 12' '12/3 + 5 = 4 + 5 = 9.'

    Add-Example '19' 'В двух коробках 31 карандаш. Во второй коробке на 7 карандашей больше, чем в первой. Сколько карандашей в каждой коробке?' @(
        'Пусть x карандашей в первой коробке.',
        'Тогда во второй коробке x + 7 карандашей.',
        'Составим уравнение: x + (x + 7) = 31.',
        '2x + 7 = 31; 2x = 24; x = 12.',
        'В первой коробке 12, во второй 12 + 7 = 19.'
    ) '12 карандашей и 19 карандашей' '12 + 19 = 31.'

    $doc.Words.Last.InsertBreak(7)

    # Practice
    Add-Text '3. Задания для самостоятельной работы' 'Heading 1'
    Add-Text 'Сначала реши без подсказки. Записывай промежуточные действия. Ответы находятся на следующей странице.'

    Add-Text 'A. Положительные и отрицательные числа' 'Heading 2'
    Add-TaskList @(
        'A1. Расположи числа в порядке возрастания: 4; −6; 0; −2; 7.',
        'A2. Сравни: а) −11 и −9;  б) −3 и 2;  в) |−7| и 6.',
        'A3. Вычисли: −16 + (−9).',
        'A4. Вычисли: −27 + 15.',
        'A5. Вычисли: 14 − (−8).',
        'A6. Вычисли: −12 − 19.',
        'A7. Вычисли: (−9) · (−6).',
        'A8. Вычисли: 72 : (−9).',
        'A9. Найди значение: 24 − 5 · (−3 + 7).',
        'A10. Температура была 3 °C, затем понизилась на 8 °C и повысилась на 2 °C. Какой стала температура?'
    )

    Add-Text 'Б. Линейные уравнения' 'Heading 2'
    Add-TaskList @(
        'Б1. x + 15 = 4',
        'Б2. x − 9 = −20',
        'Б3. −7x = 42',
        'Б4. x : 5 = −8',
        'Б5. 4x − 3 = 29',
        'Б6. 7 − 3x = 25',
        'Б7. 5(x + 2) = 3x + 18',
        'Б8. 2(3x − 4) + 6 = 4(x + 1)',
        'Б9. x/6 − 2 = 3',
        'Б10. Сумма двух последовательных натуральных чисел равна 41. Найди эти числа.'
    )

    Add-Text 'В. Мини-проверочная (смешанные задания)' 'Heading 2'
    Add-TaskList @(
        'В1. −8 + 13 − 6',
        'В2. |−15| : (−3)',
        'В3. 6 − 2 · (−4)',
        'В4. 3x − 11 = −2',
        'В5. 2(x − 5) = x + 7',
        'В6. За три одинаковые тетради и ручку стоимостью 45 руб. заплатили 180 руб. Сколько стоит одна тетрадь?'
    )

    $doc.Words.Last.InsertBreak(7)

    # Answers
    Add-Text '4. Ответы к самостоятельной работе' 'Heading 1'
    Add-Text 'Проверяй не только итог, но и ход решения. Если ответ не совпал, найди первый шаг, где изменился знак или нарушился порядок действий.'

    Add-Text 'A. Положительные и отрицательные числа' 'Heading 2'
    Add-TaskList @(
        'A1. −6; −2; 0; 4; 7.',
        'A2. а) −11 < −9;  б) −3 < 2;  в) |−7| > 6.',
        'A3. −25.  A4. −12.  A5. 22.  A6. −31.',
        'A7. 54.  A8. −8.  A9. 4.  A10. −3 °C.'
    )

    Add-Text 'Б. Линейные уравнения' 'Heading 2'
    Add-TaskList @(
        'Б1. x = −11.  Б2. x = −11.  Б3. x = −6.  Б4. x = −40.',
        'Б5. x = 8.  Б6. x = −6.  Б7. x = 4.  Б8. x = 3.',
        'Б9. x = 30.  Б10. 20 и 21.'
    )

    Add-Text 'В. Мини-проверочная' 'Heading 2'
    Add-TaskList @(
        'В1. −1.  В2. −5.  В3. 14.  В4. x = 3.',
        'В5. x = 17.  В6. 45 руб.'
    )

    Add-Text 'Памятка перед проверочной' 'Heading 2'
    Add-Rule 'Проверь себя' '□ Не потерял ли знак «−»?  □ Заменил ли вычитание отрицательного числа сложением?  □ Сначала выполнил действия в скобках и умножение?  □ В уравнении сделал одинаковое действие с обеими частями?  □ Подставил найденный корень для проверки?'

    # Header/footer and page numbers
    foreach ($sec in $doc.Sections) {
        $header = $sec.Headers.Item(1).Range
        $header.Text = 'Математика, 7 класс • Повторение'
        $header.Font.Name = 'Arial'
        $header.Font.Size = 8
        $header.Font.Color = 0x777777
        $header.ParagraphFormat.Alignment = 2

        $footer = $sec.Footers.Item(1).Range
        $footer.Text = 'Страница '
        $footer.Font.Name = 'Arial'
        $footer.Font.Size = 9
        $footer.ParagraphFormat.Alignment = 1
        $footer.Collapse(0)
        $null = $footer.Fields.Add($footer, 33)
    }

    $doc.SaveAs2($docxPath, 16)
    $doc.ExportAsFixedFormat($pdfPath, 17)
    $doc.Close($false)
}
finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}

Write-Output $docxPath
Write-Output $pdfPath
