/*
  Warnings:

  - The values [SIGNUP] on the enum `user_interactions_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user_interactions` MODIFY `type` ENUM('ADD_USER', 'LOGIN', 'LOGOUT', 'ADD_TO_CART', 'REMOVE_FROM_CART', 'PLACE_ORDER', 'CANCEL_ORDER') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
