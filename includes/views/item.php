<?php
$item_classes    = $image_data['item_classes'];
$img_classes     = $image_data['img_classes'];
$img_full        = $image_data['image_full'];
$image_src        = $image_data['image_src'];
?>

<div class="<?php echo esc_attr(implode(' ', $item_classes)); ?>">
    <div class="pmg-item-overlay"></div>
    <div class="pmg-item-content">
        <img src="<?php echo esc_attr($image_src); ?>" class="<?php echo esc_attr(implode(' ', $img_classes)); ?>" />
        <div class="pmg-caption">
            <div class="pmg-caption-inner">
                <?php if ('on' !== $this->props['hide_caption'] && 'on' !== $this->props['hide_title']) : ?>
                    <h2 class='pmg-title'><?php echo wp_kses_post($image_data['title']); ?></h2>
                <?php endif ?>
                <?php if ('on' !== $this->props['hide_caption'] && 'on' !== $this->props['hide_description']) : ?>
                    <p class="pmg-description"><?php echo wp_kses_post($image_data['description']); ?></p>
                <?php endif ?>
            </div>
        </div>
    </div>
</div>