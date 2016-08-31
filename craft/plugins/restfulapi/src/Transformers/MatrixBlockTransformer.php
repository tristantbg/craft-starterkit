<?php

namespace RestfulApi\Transformers;

use Craft\MatrixBlockModel;

class MatrixBlockTransformer extends BaseTransformer
{
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->availableIncludes = array_merge($this->availableIncludes, [
            'type',
        ]);
    }

    /**
     * Transform
     *
     * @param MatrixBlockModel $element MatrixBlock
     *
     * @return array MatrixBlock
     */
    public function transform(MatrixBlockModel $element)
    {
        return [
            'id'          => (int) $element->id,
            'enabled'     => (bool) $element->enabled,
            'archived'    => (bool) $element->archived,
            'locale'      => $element->locale,
            'slug'        => $element->slug,
            'uri'         => $element->uri,
            'dateCreated' => $element->dateCreated,
            'dateUpdated' => $element->dateUpdated,
            'root'        => ($element->root) ? (int) $element->root : null,
            'lft'         => ($element->lft) ? (int) $element->lft : null,
            'rgt'         => ($element->rgt) ? (int) $element->rgt : null,
            'level'       => ($element->level) ? (int) $element->level : null,
            'fieldId'     => (int) $element->fieldId,
            'ownerId'     => (int) $element->ownerId,
            'ownerLocale' => ($element->ownerLocale) ? (int) $element->ownerLocale : null,
            'typeId'      => (int) $element->typeId,
            'sortOrder'   => (int) $element->fieldId,
            'collapsed'   => (bool) $element->collapsed,
        ];
    }

    /**
     * Include Type
     *
     * @param MatrixBlockModel $element MatrixBlock
     *
     * @return League\Fractal\Resource\Item Type
     */
    public function includeType(MatrixBlockModel $element)
    {
        $type = $element->getType();

        if ($type) {
            return $this->item($type, new MatrixBlockTypeTransformer);
        }
    }

}
