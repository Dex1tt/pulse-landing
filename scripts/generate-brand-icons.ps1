Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$appDirectory = Join-Path $projectRoot "app"

function New-PulseIconPng {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][int]$Size
  )

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(20, 20, 20))

  $softWhite = [System.Drawing.Color]::FromArgb(246, 244, 239)
  $electricBlue = [System.Drawing.Color]::FromArgb(37, 92, 255)
  $circlePen = New-Object System.Drawing.Pen($softWhite, [Math]::Max(2, $Size * 0.0625))
  $pulsePen = New-Object System.Drawing.Pen($electricBlue, [Math]::Max(2, $Size * 0.07))
  $pulsePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pulsePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pulsePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

  $margin = $Size * 0.11
  $graphics.DrawEllipse($circlePen, $margin, $margin, $Size - (2 * $margin), $Size - (2 * $margin))

  $points = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($Size * 0.20, $Size * 0.52),
    [System.Drawing.PointF]::new($Size * 0.35, $Size * 0.52),
    [System.Drawing.PointF]::new($Size * 0.425, $Size * 0.345),
    [System.Drawing.PointF]::new($Size * 0.55, $Size * 0.69),
    [System.Drawing.PointF]::new($Size * 0.65, $Size * 0.465),
    [System.Drawing.PointF]::new($Size * 0.80, $Size * 0.465)
  )
  $graphics.DrawLines($pulsePen, $points)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $pulsePen.Dispose()
  $circlePen.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

$appleIconPath = Join-Path $appDirectory "apple-icon.png"
$faviconPngPath = Join-Path $appDirectory "favicon-source.png"
$faviconPath = Join-Path $appDirectory "favicon.ico"

New-PulseIconPng -Path $appleIconPath -Size 180
New-PulseIconPng -Path $faviconPngPath -Size 64

$ogImagePath = Join-Path $appDirectory "opengraph-image.png"
$ogBitmap = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ogGraphics = [System.Drawing.Graphics]::FromImage($ogBitmap)
$ogGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogGraphics.Clear([System.Drawing.Color]::FromArgb(246, 244, 239))

$inkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20, 20, 20))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 110, 106))
$limeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(198, 255, 62))
$peachBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 158, 122))
$berryBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 66, 232))
$titleFont = New-Object System.Drawing.Font("Arial", 72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$logoFont = New-Object System.Drawing.Font("Arial", 34, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$labelFont = New-Object System.Drawing.Font("Arial", 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$ogGraphics.FillRectangle($limeBrush, 720, 0, 160, 630)
$ogGraphics.FillRectangle($peachBrush, 880, 0, 160, 630)
$ogGraphics.FillRectangle($berryBrush, 1040, 0, 160, 630)
$ogGraphics.DrawString("PULSE", $logoFont, $inkBrush, 64, 54)
$ogGraphics.DrawString("CLEAN ENERGY", $titleFont, $inkBrush, 58, 185)
$ogGraphics.DrawString("FOR CURIOUS", $titleFont, $inkBrush, 58, 270)
$ogGraphics.DrawString("MINDS.", $titleFont, $inkBrush, 58, 355)
$ogGraphics.DrawString("CLEAN CAFFEINE  /  L-THEANINE  /  ZERO SUGAR", $labelFont, $mutedBrush, 64, 525)

$canFiles = @("can-lime.png", "can-peach.png", "can-berry.png")
$canPositions = @(
  @{ X = 702; Y = 112; W = 205; H = 430 },
  @{ X = 846; Y = 67; W = 225; H = 480 },
  @{ X = 1012; Y = 128; W = 185; H = 390 }
)

for ($index = 0; $index -lt $canFiles.Count; $index++) {
  $canPath = Join-Path $projectRoot ("public\images\" + $canFiles[$index])
  $canImage = [System.Drawing.Image]::FromFile($canPath)
  $position = $canPositions[$index]
  $ogGraphics.DrawImage($canImage, $position.X, $position.Y, $position.W, $position.H)
  $canImage.Dispose()
}

$ogBitmap.Save($ogImagePath, [System.Drawing.Imaging.ImageFormat]::Png)
$labelFont.Dispose()
$logoFont.Dispose()
$titleFont.Dispose()
$berryBrush.Dispose()
$peachBrush.Dispose()
$limeBrush.Dispose()
$mutedBrush.Dispose()
$inkBrush.Dispose()
$ogGraphics.Dispose()
$ogBitmap.Dispose()

$pngBytes = [System.IO.File]::ReadAllBytes($faviconPngPath)
$stream = [System.IO.File]::Create($faviconPath)
$writer = New-Object System.IO.BinaryWriter($stream)
$writer.Write([uint16]0)
$writer.Write([uint16]1)
$writer.Write([uint16]1)
$writer.Write([byte]64)
$writer.Write([byte]64)
$writer.Write([byte]0)
$writer.Write([byte]0)
$writer.Write([uint16]1)
$writer.Write([uint16]32)
$writer.Write([uint32]$pngBytes.Length)
$writer.Write([uint32]22)
$writer.Write($pngBytes)
$writer.Dispose()
$stream.Dispose()

Remove-Item -LiteralPath $faviconPngPath
