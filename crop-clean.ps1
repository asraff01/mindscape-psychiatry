Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\HP\.gemini\antigravity\brain\fbdcf2c4-03f2-44e5-973b-20c30a5a4355\.user_uploaded\media_1788168862022.jpg"
$dstPath = "C:\Users\HP\.gemini\antigravity\scratch\psychiatrist-portfolio\images\dr_manivannan_clean.jpg"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

Write-Host "Original Image Dimensions: $w x $h"

# The Instagram status bar + 2/4 badge is in the top 210 pixels of 1024px image (~20.5%)
# Let's crop from Y = 220px to Y = 780px (height = 560px), which perfectly captures Dr. Manivannan without ANY badge!
$cropY = 225
$cropH = 555

$rect = New-Object System.Drawing.Rectangle(0, $cropY, $w, $cropH)
$bmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

$img.Dispose()
$graphics.Dispose()

$bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

Write-Host "New clean doctor portrait saved to $dstPath with height $cropH (2/4 badge 100% eliminated)!"
