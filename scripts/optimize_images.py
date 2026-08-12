"""Create responsive AVIF/WebP variants without upscaling source images."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination_base", type=Path)
    parser.add_argument("--widths", nargs="+", type=int, default=[640, 1280])
    args = parser.parse_args()

    args.destination_base.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(args.source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        for requested_width in sorted(set(args.widths)):
            width = min(requested_width, image.width)
            height = round(image.height * width / image.width)
            resized = image if width == image.width else image.resize((width, height), Image.Resampling.LANCZOS)
            suffix = str(width)
            resized.save(
                args.destination_base.with_name(f"{args.destination_base.name}-{suffix}.avif"),
                "AVIF",
                quality=54,
                speed=6,
            )
            resized.save(
                args.destination_base.with_name(f"{args.destination_base.name}-{suffix}.webp"),
                "WEBP",
                quality=78,
                method=6,
            )


if __name__ == "__main__":
    main()
