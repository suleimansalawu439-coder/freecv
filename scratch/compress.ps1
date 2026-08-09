Add-Type -AssemblyName System.Drawing
$bmp = new-object System.Drawing.Bitmap "C:\xampp\htdocs\freecv\public\og-image.png"
$bmp.Save("C:\xampp\htdocs\freecv\public\og-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
